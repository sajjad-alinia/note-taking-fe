export const stripHtmlTags = (html: string): string => {
  if (!html) return "";
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
};
