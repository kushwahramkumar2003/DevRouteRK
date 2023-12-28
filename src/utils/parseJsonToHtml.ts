import React from "react";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import italic from "@tiptap/extension-italic";
import bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";

const parseJsonToHtml = (json): string | Element | Element[] | null => {
  return parse(generateHTML(json, [Document, Paragraph, Text, italic, bold]));
};

export default parseJsonToHtml;
