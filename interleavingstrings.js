//Objective is to see whether we can make one string (s3) from interleaving two other strings (s1 & s2)

let s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"


//O(n * m) solution where n and m are the lenghts of the two strings respectively

if (s3.length != s1.length + s2.length) {
    return false
}

let dp = new Array(s1.length + 1).fill(0).map(() => new Array(s2.length + 1).fill(0))

for (let i = 0; i < s1.length + 1; i++) {
    for (let j = 0; j < s2.length + 1; j++) {
        if (i == 0 && j == 0) {
            //Base case
            dp[i][j] = true
        } else if (i == 0) {
            //Make sure the previous letter was correct (from a previous sequence) and check if letters match
            dp[i][j] = dp[i][j - 1] && s2[j - 1] == s3[i + j - 1]
        } else if (j == 0) {
            //Make sure the previous letter was correct (from a previous sequence) and check if letters match
            dp[i][j] = dp[i - 1][j] && s1[i - 1] == s3[i + j - 1]
        } else {
            //We can use a character from either word
            dp[i][j] = (dp[i - 1][j] && s1[i - 1] == s3[i + j - 1]) || (dp[i][j - 1] && s2[j - 1] == s3[i + j - 1])
        }
    }
}

return dp[s1.length][s2.length]