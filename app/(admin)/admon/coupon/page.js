import PromoCodesPage from "./CouponCom";


export default function CouponPage() {
    return (
        <main className="px-4">

            <div className='text-purple-700 text-sm py-3 font-semibold'>
                <span>Admin</span>
                <span className='mx-1'>/</span>
                <span>Coupon</span>
            </div>

            <PromoCodesPage />

        </main>
    )
}
