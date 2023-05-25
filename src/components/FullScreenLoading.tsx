
function FullScreenLoading() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div className="w-20 h-20 border-4 border-blue-900 rounded-full animate-bounce"></div>
        </div>
    )
}

export default FullScreenLoading