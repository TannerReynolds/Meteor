module.exports = {
    command: "cursive",
    description: "convert your input into cursive",
    syntax: ")>cursive [text]",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {

        let characters = args.join(' ').split('');
        let cancerCharacters = [];

        let a = "𝒶",
            A = "𝒜";
        let b = "𝒷",
            B = "𝐵";
        let c = "𝒸",
            C = "𝒞";
        let d = "𝒹",
            D = "𝒟";
        let e = "𝑒",
            E = "𝐸";
        let f = "𝒻",
            F = "𝐹";
        let g = "𝑔",
            G = "𝒢";
        let h = "𝒽",
            H = "𝐻";
        let i = "𝒾",
            I = "𝐼";
        let j = "𝒿",
            J = "𝒥";
        let k = "𝓀",
            K = "𝒦";
        let l = "𝓁",
            L = "𝐿";
        let m = "𝓂",
            M = "𝑀";
        let n = "𝓃",
            N = "𝒩";
        let o = "𝑜",
            O = "𝒪";
        let p = "𝓅",
            P = "𝒫";
        let q = "𝓆",
            Q = "𝒬";
        let r = "𝓇",
            R = "𝑅";
        let s = "𝓈",
            S = "𝒮";
        let t = "𝓉",
            T = "𝒯";
        let u = "𝓊",
            U = "𝒰";
        let v = "𝓋",
            V = "𝒱";
        let w = "𝓌",
            W = "𝒲";
        let x = "𝓍",
            X = "𝒳";
        let y = "𝓎",
            Y = "𝒴";
        let z = "𝓏",
            Z = "𝒵";


        for (let ii = 0, len = characters.length; ii < len; ii++) {
            if (characters[ii] === 'a') {
                cancerCharacters.push(a)
            } else if (characters[ii] === 'b') {
                cancerCharacters.push(b)
            } else if (characters[ii] === 'c') {
                cancerCharacters.push(c)
            } else if (characters[ii] === 'd') {
                cancerCharacters.push(d)
            } else if (characters[ii] === 'e') {
                cancerCharacters.push(e)
            } else if (characters[ii] === 'f') {
                cancerCharacters.push(f)
            } else if (characters[ii] === 'g') {
                cancerCharacters.push(g)
            } else if (characters[ii] === 'h') {
                cancerCharacters.push(h)
            } else if (characters[ii] === 'i') {
                cancerCharacters.push(i)
            } else if (characters[ii] === 'j') {
                cancerCharacters.push(j)
            } else if (characters[ii] === 'k') {
                cancerCharacters.push(k)
            } else if (characters[ii] === 'l') {
                cancerCharacters.push(l)
            } else if (characters[ii] === 'm') {
                cancerCharacters.push(m)
            } else if (characters[ii] === 'n') {
                cancerCharacters.push(n)
            } else if (characters[ii] === 'o') {
                cancerCharacters.push(o)
            } else if (characters[ii] === 'p') {
                cancerCharacters.push(p)
            } else if (characters[ii] === 'q') {
                cancerCharacters.push(q)
            } else if (characters[ii] === 'r') {
                cancerCharacters.push(r)
            } else if (characters[ii] === 's') {
                cancerCharacters.push(s)
            } else if (characters[ii] === 't') {
                cancerCharacters.push(t)
            } else if (characters[ii] === 'u') {
                cancerCharacters.push(u)
            } else if (characters[ii] === 'v') {
                cancerCharacters.push(v)
            } else if (characters[ii] === 'w') {
                cancerCharacters.push(w)
            } else if (characters[ii] === 'x') {
                cancerCharacters.push(x)
            } else if (characters[ii] === 'y') {
                cancerCharacters.push(y)
            } else if (characters[ii] === 'z') {
                cancerCharacters.push(z)
            } else if (characters[ii] === 'A') {
                cancerCharacters.push(A)
            } else if (characters[ii] === 'B') {
                cancerCharacters.push(B)
            } else if (characters[ii] === 'C') {
                cancerCharacters.push(C)
            } else if (characters[ii] === 'D') {
                cancerCharacters.push(D)
            } else if (characters[ii] === 'E') {
                cancerCharacters.push(E)
            } else if (characters[ii] === 'F') {
                cancerCharacters.push(F)
            } else if (characters[ii] === 'G') {
                cancerCharacters.push(G)
            } else if (characters[ii] === 'H') {
                cancerCharacters.push(H)
            } else if (characters[ii] === 'I') {
                cancerCharacters.push(I)
            } else if (characters[ii] === 'J') {
                cancerCharacters.push(J)
            } else if (characters[ii] === 'K') {
                cancerCharacters.push(K)
            } else if (characters[ii] === 'L') {
                cancerCharacters.push(L)
            } else if (characters[ii] === 'M') {
                cancerCharacters.push(M)
            } else if (characters[ii] === 'N') {
                cancerCharacters.push(N)
            } else if (characters[ii] === 'O') {
                cancerCharacters.push(O)
            } else if (characters[ii] === 'P') {
                cancerCharacters.push(P)
            } else if (characters[ii] === 'Q') {
                cancerCharacters.push(Q)
            } else if (characters[ii] === 'R') {
                cancerCharacters.push(R)
            } else if (characters[ii] === 'S') {
                cancerCharacters.push(S)
            } else if (characters[ii] === 'T') {
                cancerCharacters.push(T)
            } else if (characters[ii] === 'U') {
                cancerCharacters.push(U)
            } else if (characters[ii] === 'V') {
                cancerCharacters.push(V)
            } else if (characters[ii] === 'W') {
                cancerCharacters.push(W)
            } else if (characters[ii] === 'X') {
                cancerCharacters.push(X)
            } else if (characters[ii] === 'Y') {
                cancerCharacters.push(Y)
            } else if (characters[ii] === 'Z') {
                cancerCharacters.push(Z)
            } else {
                cancerCharacters.push(characters[ii]);
            }
        }
        msg.channel.createMessage(cancerCharacters.join(''));
    }
}