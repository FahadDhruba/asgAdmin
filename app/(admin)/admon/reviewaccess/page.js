import RevBook from "./RevBook";

export default function ReviewAccess() {
    return (
        <main className="px-4">

            <div className='text-purple-700 text-sm py-3 font-semibold'>
                <span>Admin</span>
                <span className='mx-1'>/</span>
                <span>Review Books</span>
            </div>

            <RevBook />

        </main>
    )
}
