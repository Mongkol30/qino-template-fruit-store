import errors from '../../tokens/errors';

const errorsTranslation = {
  // 401
  [errors.error401Title]: '401: ต้องมีการยืนยันตัวตน',
  [errors.error401Message]:
    'คุณอาจเข้าถึงเส้นทางที่ไม่ถูกต้องหรือมาที่นี่โดยไม่ตั้งใจ ไม่ว่าจะอย่างไร ลองใช้การนำทาง',

  // 404
  [errors.error404Title]: '404: ไม่พบหน้าที่คุณกำลังค้นหา',
  [errors.error404Message]:
    'คุณอาจเข้าถึงเส้นทางที่ไม่ถูกต้องหรือมาที่นี่โดยไม่ตั้งใจ ไม่ว่าจะอย่างไร ลองใช้การนำทาง',

  // 500
  [errors.error500Title]: '500: เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์',
  [errors.error500Message]:
    'คุณอาจเข้าถึงเส้นทางที่ไม่ถูกต้องหรือมาที่นี่โดยไม่ตั้งใจ ไม่ว่าจะอย่างไร ลองใช้การนำทาง',

  // Common
  [errors.backToHome]: '← กลับหน้าหลัก',
};

export default errorsTranslation;
