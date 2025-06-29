/* eslint-disable no-console */
require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");

const RAW_DB_NAME      = "HistoricalCropYield";
const RAW_COLLECTION   = "Historical Crop Yield"; // exact name incl. space/case
const TARGET_COLLECTION = "cropnodes";            // collection the frontend reads

//------------------------------------------------
// 1. Connect to MongoDB Atlas
//------------------------------------------------
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Mongo connection error:", err.message);
    process.exit(1);
  }

  //------------------------------------------------
  // 2. Access raw collection
  //------------------------------------------------
  const rawDb  = mongoose.connection.useDb(RAW_DB_NAME);
  const rawCol = rawDb.collection(RAW_COLLECTION);

  const rawDocs = await rawCol.find().toArray();
  console.log(`📦 Found ${rawDocs.length} raw documents`);

  if (!rawDocs.length) {
    console.log("⚠️  No data to transform — exiting.");
    await mongoose.disconnect();
    return;
  }

  //------------------------------------------------
  // 3. Transform each raw doc
  //------------------------------------------------
  const transformed = rawDocs.map((doc) => {
    // Build per-crop yield map
    const yieldData = {};
    for (let y = 1987; y <= 2023; y++) {
      const v = doc[`Y${y}`];
      if (v != null && v !== -999) yieldData[y] = Number(v);
    }

    // Grab ALL Y#### / A#### fields to copy verbatim
    const yearFields = Object.fromEntries(
      Object.entries(doc).filter(([k]) => /^Y\d{4}$|^A\d{4}$/.test(k))
    );

    return {
      CARUID   : doc.CARUID,
      deviceId : `Victory-${doc.CARUID}-${doc.CROP}`,
      location : {
        coordinates: [Number(doc.LONGITUDE), Number(doc.LATITUDE)], // [lng, lat]
      },
      crops: [
        { name: doc.CROP, yield: yieldData },
      ],
      ...yearFields,               // ⬅️  attach Y#### / A#### fields
    };
  });

  //------------------------------------------------
  // 4. Replace target collection contents
  //------------------------------------------------
  const targetCol = rawDb.collection(TARGET_COLLECTION);
  await targetCol.deleteMany({});
  await targetCol.insertMany(transformed);

  console.log(
    `✅ Inserted ${transformed.length} docs into "${TARGET_COLLECTION}"`
  );

  await mongoose.disconnect();
  console.log("🔌 Disconnected — script complete.");
})();
