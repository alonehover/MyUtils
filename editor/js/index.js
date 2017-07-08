window.onload = function() {
    window.document.designMode = "On";
    const editor = document.getElementById("editor");

    editor.addEventListener("keydown", function(e) {
        if(e.keyCode == 9) {
            e.preventDefault();
            const indent = "\u00a0\u00a0\u00a0\u00a0";
            const start = this.selectionStart;
            const end = this.selectionEnd;
            let selected = window.getSelection().toString();
            selected = indent + selected.replace(/\n/g, "\n" + indent);
            document.execCommand("insertHTML", false, selected)
        }
    });
}
