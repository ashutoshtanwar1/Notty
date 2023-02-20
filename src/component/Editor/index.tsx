import { FC } from "react";

const KEY = "APP_DATA:V1";

const Editor: FC = () => {
  const onPasteHandle = (e: any) => {
    e.preventDefault();
    const text = (e.originalEvent || e).clipboardData.getData("text/plain");
    document?.execCommand("insertText", false, text);
  };

  const onTextChangeHandle = (e: any) => {
    localStorage.setItem(
      KEY,
      JSON.stringify(e.currentTarget.innerText, null, 0)
    );
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 9) {
      e.preventDefault();

      const editor = document.getElementById("editor");
      const doc = editor?.ownerDocument.defaultView;
      const sel = doc?.getSelection();
      const range = sel?.getRangeAt(0);

      const tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
      range?.insertNode(tabNode);

      range?.setStartAfter(tabNode);
      range?.setEndAfter(tabNode);
      sel?.removeAllRanges();
      if (range) sel?.addRange(range);
    }
  };

  return (
    <div
      id="editor"
      className="h-screen w-screen inline-block text-white outline-none py-6 px-12 whitespace-pre"
      contentEditable
      suppressContentEditableWarning
      onPaste={onPasteHandle}
      onInput={onTextChangeHandle}
      onBlur={onTextChangeHandle}
      onKeyDown={handleKeyDown}
    >
      {JSON.parse(localStorage.getItem(KEY) ?? '""')}
    </div>
  );
};

export default Editor;
