module.exports = () => {
    //REF: https://github.com/saneef/eleventy-plugin-git-commit-date/blob/main/src/getGitCommitDateFromPath.js
    const latestGitCommitHash =
        require('child_process')
            .execSync('git rev-parse --short HEAD')
            .toString()
            .trim();

    return {
        hash: latestGitCommitHash,
        buildTime: new Date()
    }
}