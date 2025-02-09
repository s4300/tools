const input = document.getElementById("input");
const output = document.getElementById("output");

function obfuscate(code) {
    let r = code;
    for (let i = 0; i < Math.floor(Math.random() * 7) + 2; i++) {
        r = `${r}`;
        if (Math.random() > 0.5) {
            r = `eval(atob(\`${btoa(r)}\`))`;
        } else {
            r = JavaScriptObfuscator.obfuscate(`${r}`, {
                    compact: true,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1,
                    numbersToExpressions: true,
                    simplify: true,
                    stringArrayShuffle: true,
                    splitStrings: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        };
    };
    return r;
};

document.getElementById("obfuscate").addEventListener("click", () => {  
    try {
        if (!input.value) return;
        output.textContent = obfuscate(unescape(input.value));
        download.disabled = false;
        download.classList.remove("disabled");
    } catch (err) {
        output.textContent = err;
    };
});

document.getElementById("download").addEventListener("click", () => {
    let blob = new Blob([output.textContent], { type: "text/javascript" });
    let blobUrl = URL.createObjectURL(blob);
    let elem = document.createElement("a");

    elem.parentNode = document;
    elem.href = blobUrl;
    elem.download = "obfuscated.js";
    elem.click();
});

document.getElementById("uploadFile").addEventListener("change", async () => {
    let file = document.getElementById("uploadFile").files[0];
    document.getElementById("input").value = await file.text();
    document.getElementById("obfuscate").click();
});
