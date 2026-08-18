import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Github, Star, GitFork, BookOpen, Clock, Activity, GitCommit } from "lucide-react";

export default function GitHubShowcase() {
  const username = "ankitsharma706";
  const [repos, setRepos] = useState<any[]>([]);
  const [commits, setCommits] = useState<any[]>([]);
  const [isLoadingCommits, setIsLoadingCommits] = useState(true);

  useEffect(() => {
    // Fetch top repositories from GitHub REST API
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
          
          // Now fetch latest events
          fetch(`https://api.github.com/users/${username}/events/public?per_page=15`)
            .then(res => res.json())
            .then(eventsData => {
              if (Array.isArray(eventsData)) {
                const pushEvents = eventsData.filter((e: any) => e.type === "PushEvent");
                
                if (pushEvents.length > 0) {
                  const extractedCommits = pushEvents.flatMap((e: any) => 
                    e.payload.commits.map((c: any) => ({
                      ...c,
                      repoName: e.repo.name,
                      createdAt: e.created_at
                    }))
                  ).slice(0, 5); // get top 5 latest commits
                  setCommits(extractedCommits);
                  setIsLoadingCommits(false);
                } else if (data.length > 0) {
                  // Fallback: fetch commits from the most recently updated repository
                  const latestRepo = data[0].name;
                  fetch(`https://api.github.com/repos/${username}/${latestRepo}/commits?per_page=5`)
                    .then(res => res.json())
                    .then(commitData => {
                      if (Array.isArray(commitData)) {
                        const extractedCommits = commitData.map((c: any) => ({
                          sha: c.sha,
                          message: c.commit.message,
                          repoName: latestRepo,
                          createdAt: c.commit.author.date
                        }));
                        setCommits(extractedCommits);
                      }
                    })
                    .catch(console.error)
                    .finally(() => setIsLoadingCommits(false));
                } else {
                  setIsLoadingCommits(false);
                }
              }
            })
            .catch((err) => {
              console.error(err);
              setIsLoadingCommits(false);
            });
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section id="github" className="w-full py-24 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--color-border)] mb-6 text-[var(--text-secondary)] font-medium"
        >
          <Github className="w-5 h-5" />
          <span>Open Source</span>
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--text-primary)]">
          GitHub Activity
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl text-lg">
          A transparent look at my engineering habits. Continuous integration, open source contributions, and real-time activity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* GitHub Stats Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="premium-card p-6 flex flex-col justify-center items-center lg:col-span-1 shadow-xl hover:shadow-2xl transition-shadow"
        >
          <img 
            src={`https://github-readme-stats-eight-theta.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=2563EB&text_color=9CA3AF&icon_color=2563EB`}
            alt="GitHub Stats" 
            className="w-full max-w-sm"
          />
        </motion.div>

        {/* Top Languages */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="premium-card p-6 flex flex-col justify-center items-center lg:col-span-1 shadow-xl hover:shadow-2xl transition-shadow"
        >
          <img 
            src={`https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&title_color=2563EB&text_color=9CA3AF`}
            alt="Top Languages" 
            className="w-full max-w-sm"
          />
        </motion.div>

        {/* Latest Commits */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="premium-card p-6 flex flex-col lg:col-span-1 overflow-hidden shadow-xl"
        >
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[var(--color-primary)]" />
            Latest Commits
          </h3>
          <div className="flex flex-col gap-4 overflow-y-auto pr-2 hide-scrollbar">
            {isLoadingCommits ? (
              <div className="text-[var(--text-muted)] text-sm animate-pulse">Loading latest activity...</div>
            ) : commits.length > 0 ? (
              commits.map((commit, i) => (
                <div key={i} className="flex gap-3 items-start border-l-2 border-[var(--color-border)] pl-3 pb-2">
                  <GitCommit className="w-4 h-4 text-[var(--text-muted)] mt-1 flex-shrink-0 -ml-[21px] bg-[var(--bg-primary)]" />
                  <div className="flex flex-col">
                    <a 
                      href={`https://github.com/${commit.repoName}/commit/${commit.sha}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--color-primary)] truncate max-w-[250px] transition-colors"
                    >
                      {commit.message.split('\n')[0]}
                    </a>
                    <span className="text-xs text-[var(--text-muted)] truncate max-w-[250px]">{commit.repoName}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-[var(--text-muted)] text-sm italic">
                No recent public commits found in the last 90 days.
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Top Repositories Grid */}
      <h3 className="text-2xl font-bold tracking-tight mb-8 text-[var(--text-primary)] flex items-center gap-3">
        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500/20" />
        Featured Repositories
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, i) => (
          <motion.a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="premium-card p-6 flex flex-col h-full group hover:border-[var(--color-primary)] transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-[var(--text-primary)] truncate">{repo.name}</h4>
            </div>
            
            <p className="text-[var(--text-muted)] text-sm mb-6 flex-grow line-clamp-3">
              {repo.description || "No description provided."}
            </p>
            
            <div className="flex items-center gap-4 text-xs font-medium text-[var(--text-secondary)] mt-auto pt-4 border-t border-[var(--color-border)]">
              {repo.language && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]"></span>
                  {repo.language}
                </div>
              )}
              <div className="flex items-center gap-1 group-hover:text-[var(--text-primary)] transition-colors">
                <Star className="w-3.5 h-3.5" />
                {repo.stargazers_count}
              </div>
              <div className="flex items-center gap-1 group-hover:text-[var(--text-primary)] transition-colors">
                <GitFork className="w-3.5 h-3.5" />
                {repo.forks_count}
              </div>
              <div className="flex items-center gap-1 ml-auto">
                <Clock className="w-3.5 h-3.5" />
                {new Date(repo.updated_at).toLocaleDateString()}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
