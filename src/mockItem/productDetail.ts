export type ProductDetail = {
    productId: number;
    sku: string;
    stockText: string;
    fruitType: string;
    originCountry: string;
    shelfLife: string;
    weightText: string;
    shipFrom: string;
    description: string;
    weightDefault?: string;
};

const productDetails: ProductDetail[] = [
    {
        productId: 2,
        sku: 'A:264672',
        stockText: 'สินค้าพร้อมส่ง',
        fruitType: 'ทุเรียน',
        originCountry: 'ไทย',
        shelfLife: '1 เดือน',
        weightText: '100 kg',
        shipFrom: 'จังหวัดนครศรีธรรมราช',
        description: `ทุเรียนหมอนทองสดจากสวน ราคาชาวสวน ไม่ผ่านคนกลาง
หอมหวาน เนื้อแน่น คัดเกรดทุกลูก
ไม่ใช้สารเร่ง ไม่ใช้ยาฆ่าแมลง
ส่งตรงถึงมือลูกค้า`,
    },
    {
        productId: 1,
        sku: 'A:264671',
        stockText: 'สินค้าพร้อมส่ง',
        fruitType: 'ลิ้นจี่',
        originCountry: 'ไทย',
        shelfLife: '2 สัปดาห์',
        weightText: '1 kg',
        shipFrom: 'จังหวัดเชียงใหม่',
        description: 'ลิ้นจี่สดหวานหอม คัดเกรดพรีเมียมจากสวน',
    },
];

export default productDetails;

// lookup map 
export const productDetailByProductId: Record<number, ProductDetail> =
    Object.fromEntries(productDetails.map((d) => [d.productId, d]));
