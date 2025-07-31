import { MoreHorizontal, Circle } from "react-feather";

export default function ArtistsTable() {
  const artists = [
    {
      id: 1,
      name: "Maya Chen",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      genre: "Electronic",
      status: "online",
      location: "Tokyo"
    },
    {
      id: 2,
      name: "Marcus Rivera",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg",
      genre: "Hip-Hop",
      status: "recording",
      location: "LA",
      featured: true
    },
    {
      id: 3,
      name: "Zara Kim",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg",
      genre: "Pop",
      status: "online",
      location: "Seoul"
    },
    {
      id: 4,
      name: "Luna Dubois",
      avatar: "https://randomuser.me/api/portraits/women/91.jpg",
      genre: "Jazz",
      status: "away",
      location: "Paris",
      featured: true
    }
  ];

  const getStatusBadge = (status) => {
    let color = "";
    let text = "";
    switch (status) {
      case "online":
        color = "text-green-300 bg-green-500/20";
        text = "Online";
        break;
      case "recording":
        color = "text-yellow-300 bg-yellow-500/20";
        text = "Recording";
        break;
      case "away":
        color = "text-gray-300 bg-gray-500/20";
        text = "Away";
        break;
      default:
        return null;
    }
    return (
      <span className={`inline-flex items-center gap-1 text-xs ${color} px-2 py-1 rounded-full`}>
        <Circle className="h-2 w-2" fill="currentColor" />
        {text}
      </span>
    );
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-white/60 border-b border-white/10">
            <tr>
              <th className="py-4 px-3 lg:px-5">Artist</th>
              <th className="py-4 px-3 lg:px-5 hidden sm:table-cell">Genre</th>
              <th className="py-4 px-3 lg:px-5 hidden md:table-cell">Status</th>
              <th className="py-4 px-3 lg:px-5 hidden lg:table-cell">Location</th>
              <th className="py-4 px-3 lg:px-5"></th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => (
              <tr key={artist.id} className="hover:bg-white/5 transition">
                <td className="py-3 px-3 lg:px-5 flex items-center gap-2">
                  <img
                    src={artist.avatar}
                    className="h-6 w-6 rounded-full"
                    alt=""
                  />
                  <span className="truncate">{artist.name}</span>
                </td>
                <td className="py-3 px-3 lg:px-5 hidden sm:table-cell">
                  {artist.genre}
                  {artist.featured && <span className="text-cyan-400 ml-1">★</span>}
                </td>
                <td className="py-3 px-3 lg:px-5 hidden md:table-cell">
                  {getStatusBadge(artist.status)}
                </td>
                <td className="py-3 px-3 lg:px-5 hidden lg:table-cell">
                  {artist.location}
                </td>
                <td className="py-3 px-3 lg:px-5 text-right">
                  <MoreHorizontal className="h-4 w-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
