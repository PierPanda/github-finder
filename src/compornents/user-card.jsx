import React, { useState, useEffect } from "react";
import UserRepoList from "./user-repo-list";

export default function UserCard({ user, onClose }) {
  const [showRepos, setShowRepos] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="inset-0 flex items-center justify-center p-4">
      <div className="bg-amber-50 rounded-md w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-5 text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className="p-10">
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start mb-6">
            <img
              src={user.avatar_url}
              alt={`Avatar de ${user.login}`}
              className="w-32 h-32 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
              {user.bio && <p className="text-gray-700 mt-2">{user.bio}</p>}
              <div className="mt-3 space-y-1">
                {user.location && <p>📍 {user.location}</p>}
                {user.company && <p>🏢 {user.company}</p>}
                <p>
                  👥 {user.followers} followers · {user.following} following
                </p>
                {user.html_url && (
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Voir le profil GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setShowRepos(!showRepos)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 mb-3 cursor-pointer"
            >
              {showRepos ? "Masquer repositories" : "Afficher repositories"}
            </button>

            {showRepos && <UserRepoList user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
}
