import auth from '../../tokens/auth';

const authTranslation = {
  // Login
  [auth.login]: 'เข้าสู่ระบบ',
  [auth.loginTitle]: 'เข้าสู่ระบบ',
  [auth.loginSubtitle]: 'ลงชื่อเข้าใช้บัญชีของคุณ',
  [auth.loginButton]: 'เข้าสู่ระบบ',
  [auth.loginSuccess]: 'เข้าสู่ระบบสำเร็จ',
  [auth.loginError]: 'เข้าสู่ระบบไม่สำเร็จ',

  // Register
  [auth.register]: 'สมัครสมาชิก',
  [auth.registerTitle]: 'สร้างบัญชี',
  [auth.registerSubtitle]: 'สมัครสมาชิกบัญชีใหม่',
  [auth.registerButton]: 'สมัครสมาชิก',
  [auth.registerSuccess]: 'สมัครสมาชิกสำเร็จ',
  [auth.registerError]: 'สมัครสมาชิกไม่สำเร็จ',

  // Logout
  [auth.logout]: 'ออกจากระบบ',
  [auth.logoutConfirm]: 'คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?',

  // Password
  [auth.forgotPassword]: 'ลืมรหัสผ่าน?',
  [auth.resetPassword]: 'รีเซ็ตรหัสผ่าน',
  [auth.changePassword]: 'เปลี่ยนรหัสผ่าน',
  [auth.confirmPassword]: 'ยืนยันรหัสผ่าน',
  [auth.passwordMismatch]: 'รหัสผ่านไม่ตรงกัน',

  // Form Fields
  [auth.firstName]: 'ชื่อ',
  [auth.lastName]: 'นามสกุล',
  [auth.email]: 'อีเมล',
  [auth.phoneOrUsername]: 'เบอร์โทรศัพท์/ชื่อผู้ใช้',
  [auth.phoneOrUsernamePlaceholder]: 'หมายเลขโทรศัพท์/ชื่อผู้ใช้',
  [auth.password]: 'รหัสผ่าน',
  [auth.passwordPlaceholder]: 'รหัสผ่าน',
  [auth.rememberMe]: 'จดจำฉัน',

  // Errors
  [auth.invalidCredentials]: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
  [auth.emailRequired]: 'กรุณากรอกอีเมล',
  [auth.phoneOrUsernameRequired]: 'กรุณากรอกเบอร์โทรศัพท์หรือชื่อผู้ใช้',
  [auth.passwordRequired]: 'กรุณากรอกรหัสผ่าน',

  // Links
  [auth.noAccount]: 'ยังไม่มีบัญชี?',
  [auth.haveAccount]: 'มีบัญชีอยู่แล้ว?',
  [auth.trackOrder]: 'Track your order',
  [auth.notRegisteredYet]: 'ยังไม่เคยสมัครสมาชิก?',
};

export default authTranslation;
