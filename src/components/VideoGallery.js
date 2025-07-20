"use client";

export default function VideoGallery({ videos, setVideos }) {
  const deleteVideo = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
    localStorage.setItem("videos", JSON.stringify(updatedVideos));
  };

  const clearAllVideos = () => {
    setVideos([]);
    localStorage.removeItem("videos");
  };

  return (
    <div className="mt-6 w-full">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-bold text-black/70">
          Saved Videos
        </h2>
        {
          videos.length > 0 && (
            <button
              onClick={clearAllVideos}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
            >
              Clear All
            </button>
          )
        }
      </div>

      {
        videos.length === 0 ? (
          <p className="text-gray-400 text-center">No videos saved yet.</p>) : 
          (
            <div className="flex flex-wrap justify-center gap-4">
              {
                videos.map((videoUrl, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md w-full sm:w-[48%] md:w-[30%] lg:w-[23%]"
                    >
                      <video
                        src={videoUrl}
                        controls
                        className="rounded-md w-full h-auto"
                      />
                      <button onClick={() => deleteVideo(index)} className="mt-2 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md w-full">
                        Delete
                      </button>

                      <a
                        href={videoUrl}
                        download={`saved-video-${index + 1}.webm`}
                        className="mt-2 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-full text-center"
                      >
                        Download
                      </a>
                    </div>
                  ) 
                )
              }
            </div>
          )
      }
    </div>
  );
}
