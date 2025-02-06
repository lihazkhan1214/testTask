import React, { useState } from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
const LiveCodeEditor = () => {
  const files = {};

  return (
    <>
      <Sandpack
        files={files}
        theme="dark"
        template="react"
        options={{ editorHeight: "400px" }}
      />
    </>
  );
};

export default LiveCodeEditor;
