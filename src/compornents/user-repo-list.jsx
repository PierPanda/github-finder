import React, { useState, useEffect } from "react";
import Loader from "./loader";

export default function UserRepoList({ user }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const response = await fetch(user.repos_url);
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Erreur lors du chargement des repositories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [user.repos_url]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3 text-center">Repositories</h3>
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="max-h-60 overflow-y-auto pr-2 border border-gray-100 rounded">
          <ul className="space-y-2 p-2">
            {repos.length > 0 ? (
              repos.slice(0, 15).map((repo) => (
                <li
                  key={repo.id}
                  className="border border-gray-200 p-3 rounded"
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-500 hover:underline"
                  >
                    {repo.name}
                  </a>
                  {repo.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex gap-4 mt-2 text-sm">
                    {repo.language && <span>🔤 {repo.language}</span>}
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                  </div>
                </li>
              ))
            ) : (
              <p className="p-3">Aucun repository trouvé</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
