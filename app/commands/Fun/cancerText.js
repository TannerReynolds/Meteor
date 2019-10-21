module.exports = {
    command: "cancertext",
    description: "Cancerify inputted text",
    syntax: ")>cancertext [text]",
    category: "Fun",
    permission: "sendMessages",
    botPermission: "sendMessages",
    execute: async (meteor, bot, msg, args) => {

        let characters = args.join(' ').split('');
        let cancerCharacters = [];

        let a = "ἀἁἂἃἄἅἆἇἈἉἊἋἌἍἎἏⒶⓐ⒜AaẠạẢảḀḁÂÃǍǎẤấẦầẨẩȂȃẪẫẬậÀÁẮắẰằẲẳẴẵẶặĀāĄąǞȀȁÅǺǻÄäǟǠǡâáåãàẚȦȧȺÅⱥÆæǼǢǣⱯꜲꜳꜸꜺꜹꜻªΛΔ"
        let b = "ẞßβⒷⓑ⒝BbḂḃḄḅḆḇƁɃƀƃƂƄƅℬ"
        let c = "Ⓒⓒ⒞CcḈḉĆćĈĉĊċČčÇçƇƈȻȼℂ℃ℭƆϾϽ"
        let d = "Ⓓⓓ⒟DdḊḋḌḍḎḏḐḑḒḓĎďƊƋƌƉĐđȡⅅⅆǱǲǳǄǅǆȸ"
        let e = "Ⓔⓔ⒠EeḔḕḖḗḘḙḚḛḜḝẸẹẺẻẾếẼẽỀềỂểỄễỆệĒēĔĕĖėĘęĚěÈèÉéÊêËëȄȅȨȩȆȇƎⱸɆℇℯ℮ƐℰƏǝⱻɇΞΣ"
        let f = "Ⓕⓕ⒡FfḞḟƑƒꜰℲⅎꟻℱ℻"
        let g = "Ⓖⓖ⒢GgƓḠḡĜĝĞğĠġĢģǤǥǦǧǴℊ⅁ǵ"
        let h = "Ⓗⓗ⒣HhḢḣḤḥḦḧḨḩḪḫẖĤĥȞȟĦħⱧⱨꜦℍǶℏℎℋℌꜧ"
        let i = "Ⓘⓘ⒤IiḬḭḮḯĲĳìíîïÌÍÎÏĨĩĪīĬĭĮįıƗƚỺǏǐⅈȉȈȊȋἰἱἲἳἴἵἶἷἸἹἺἻἼἽἾἿ"
        let j = "ℑℐⒿⓙ⒥JjĴĵȷⱼɈɉǰ"
        let k = "Ⓚⓚ⒦KkḰḱḲḳḴḵĶķƘƙꝀꝁꝂꝃꝄꝅǨǩⱩⱪĸ"
        let l = "Ⓛⓛ⒧LlḶḷḸḹḺḻḼḽĹĺĻļĽİľĿŀŁłỈỉỊịȽⱠꝈꝉⱡⱢꞁℒǇǈǉ⅃⅂ℓ℄"
        let m = "ⓜ⒨MmḾḿṀṁṂṃꟿꟽⱮƩƜℳ"
        let n = "Ⓝⓝ⒩NnṄṅṆṇṈṉṊṋŃńŅņŇňǸǹŊƝñŉÑȠƞŋǊǋǌȵℕ№ᾐᾑᾒᾓᾔᾕᾖᾗ"
        let o = "OoṌṍṎṏṐṑṒṓȪȫȬȭȮȯȰȱǪǫǬǭỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợƠơŌōŎŏŐőÒÓÔÕÖǑȌȍȎȏŒœØǾꝊǽǿℴ⍥⍤Ⓞⓞ⒪òóôõöǒøꝎꝏὀὁὂὃὄὅὈὉὊὋὌὍΘΦ"
        let p = "Ⓟⓟ⒫℗PpṔṕṖṗƤƥⱣℙǷꟼ℘Ϸϸῤῥ"
        let q = "ⓠ⒬QqɊɋℚ℺ȹ"
        let r = "Ⓡⓡ⒭RrŔŕŖŗŘřṘṙṚṛṜṝṞṟȐȑȒȓɍɌƦⱤ℞Ꝛꝛℜℛ℟ℝ"
        let s = "Ⓢⓢ⒮SsṠṡṢṣṤṥṦṧṨṩŚśŜŝŞşŠšȘșȿꜱƧƨϟϨϩ"
        let t = "Ⓣⓣ⒯TtṪṫṬṭṮṯṰṱŢţŤťŦŧƬƮẗȚȾƫƭțⱦȶ℡™ͲͳϮϯ"
        let u = "Ⓤⓤ⒰UuṲṳṴṵṶṷṸṹṺṻỤỦủỨỪụứỬửừữỮỰựŨũŪūŬŭŮůŰűǙǚǗǘǛǜŲųǓǔȔȕÛûȖȗÙùÜüƯúɄưƲƱΰῠῡῢΰμ"
        let v = "Ⓥⓥ⒱VvṼṽṾṿỼɅ℣ⱱⱴⱽν"
        let w = "Ⓦⓦ⒲WwẀẁẂẃẄẅẆẇẈẉŴŵẘⱲⱳώωϢϣ"
        let x = "Ⓧⓧ⒳XxẊẋẌẍℵ×"
        let y = "Ⓨⓨ⒴yYẎẏỾỿẙỲỳỴỵỶỷỸỹŶŷƳƴŸÿÝýɎɏȲƔ⅄ȳℽλϒϓϔΨ"
        let z = "Ⓩⓩ⒵ZzẐẑẒẓẔẕŹźŻżŽžȤȥⱫⱬƵƶɀℨℤ"


        for (let ii = 0, len = characters.length; ii < len; ii++) {
            if (characters[ii].toLowerCase() === 'a') {
                cancerCharacters.push(a[Math.floor(Math.random() * a.length) + 1])
            } else if (characters[ii].toLowerCase() === 'b') {
                cancerCharacters.push(b[Math.floor(Math.random() * b.length) + 1])
            } else if (characters[ii].toLowerCase() === 'c') {
                cancerCharacters.push(c[Math.floor(Math.random() * c.length) + 1])
            } else if (characters[ii].toLowerCase() === 'd') {
                cancerCharacters.push(d[Math.floor(Math.random() * d.length) + 1])
            } else if (characters[ii].toLowerCase() === 'e') {
                cancerCharacters.push(e[Math.floor(Math.random() * e.length) + 1])
            } else if (characters[ii].toLowerCase() === 'f') {
                cancerCharacters.push(f[Math.floor(Math.random() * f.length) + 1])
            } else if (characters[ii].toLowerCase() === 'g') {
                cancerCharacters.push(g[Math.floor(Math.random() * g.length) + 1])
            } else if (characters[ii].toLowerCase() === 'h') {
                cancerCharacters.push(h[Math.floor(Math.random() * h.length) + 1])
            } else if (characters[ii].toLowerCase() === 'i') {
                cancerCharacters.push(i[Math.floor(Math.random() * i.length) + 1])
            } else if (characters[ii].toLowerCase() === 'j') {
                cancerCharacters.push(j[Math.floor(Math.random() * j.length) + 1])
            } else if (characters[ii].toLowerCase() === 'k') {
                cancerCharacters.push(k[Math.floor(Math.random() * k.length) + 1])
            } else if (characters[ii].toLowerCase() === 'l') {
                cancerCharacters.push(l[Math.floor(Math.random() * l.length) + 1])
            } else if (characters[ii].toLowerCase() === 'm') {
                cancerCharacters.push(m[Math.floor(Math.random() * m.length) + 1])
            } else if (characters[ii].toLowerCase() === 'n') {
                cancerCharacters.push(n[Math.floor(Math.random() * n.length) + 1])
            } else if (characters[ii].toLowerCase() === 'o') {
                cancerCharacters.push(o[Math.floor(Math.random() * o.length) + 1])
            } else if (characters[ii].toLowerCase() === 'p') {
                cancerCharacters.push(p[Math.floor(Math.random() * p.length) + 1])
            } else if (characters[ii].toLowerCase() === 'q') {
                cancerCharacters.push(q[Math.floor(Math.random() * q.length) + 1])
            } else if (characters[ii].toLowerCase() === 'r') {
                cancerCharacters.push(r[Math.floor(Math.random() * r.length) + 1])
            } else if (characters[ii].toLowerCase() === 's') {
                cancerCharacters.push(s[Math.floor(Math.random() * s.length) + 1])
            } else if (characters[ii].toLowerCase() === 't') {
                cancerCharacters.push(t[Math.floor(Math.random() * t.length) + 1])
            } else if (characters[ii].toLowerCase() === 'u') {
                cancerCharacters.push(u[Math.floor(Math.random() * u.length) + 1])
            } else if (characters[ii].toLowerCase() === 'v') {
                cancerCharacters.push(v[Math.floor(Math.random() * v.length) + 1])
            } else if (characters[ii].toLowerCase() === 'w') {
                cancerCharacters.push(w[Math.floor(Math.random() * w.length) + 1])
            } else if (characters[ii].toLowerCase() === 'x') {
                cancerCharacters.push(x[Math.floor(Math.random() * x.length) + 1])
            } else if (characters[ii].toLowerCase() === 'y') {
                cancerCharacters.push(y[Math.floor(Math.random() * y.length) + 1])
            } else if (characters[ii].toLowerCase() === 'z') {
                cancerCharacters.push(z[Math.floor(Math.random() * z.length) + 1])
            } else {
                cancerCharacters.push(characters[ii]);
            }
        }

        msg.channel.createMessage(cancerCharacters.join(''));

    }
}