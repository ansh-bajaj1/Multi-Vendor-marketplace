const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/marketplace';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function run() {
  try {
    console.log('Connecting to MongoDB...', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('Connected');

    const email = process.env.TEST_EMAIL || 'autotest-run@example.com';
    const name = 'Auto Test Run';
    const password = 'secret123';

    // Remove existing test user if present
    await User.deleteMany({ email });
    console.log('Existing test users removed');

    // Register
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const created = await User.create({ name, email, password: hashed });
    console.log('User created:', { id: created._id.toString(), email: created.email });

    // Verify persisted
    const fetched = await User.findOne({ email }).lean();
    if (!fetched) throw new Error('User not found after create');
    console.log('User found in DB with id:', fetched._id.toString());

    // Login check
    const match = await bcrypt.compare(password, fetched.password);
    console.log('Password match:', match);

    const token = jwt.sign({ sub: fetched._id.toString(), email: fetched.email }, JWT_SECRET, { expiresIn: '15m' });
    console.log('Generated token (truncated):', token.slice(0, 40) + '...');

    await mongoose.disconnect();
    console.log('Done');
  } catch (err) {
    console.error('Error running auth test:', err);
    process.exitCode = 1;
  }
}

run();
