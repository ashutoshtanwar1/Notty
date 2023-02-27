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
      JSON.stringify(e.currentTarget.innerHTML, null, 0)
    );
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 9) {
      e.preventDefault();
    }
    if (e.keyCode === 189) {
      e.preventDefault();
      document?.execCommand("insertOrderedList");
    }
  };

  return (
    <div
      id="editor"
      className="h-screen w-screen inline-block text-white outline-none py-6 px-12 whitespace-pre"
      contentEditable
      spellCheck={false}
      suppressContentEditableWarning
      onPaste={onPasteHandle}
      onInput={onTextChangeHandle}
      onBlur={onTextChangeHandle}
      onKeyDown={handleKeyDown}
      dangerouslySetInnerHTML={{
        __html: JSON.parse(localStorage.getItem(KEY) ?? '""'),
      }}
    />
  );
};

export default Editor;
