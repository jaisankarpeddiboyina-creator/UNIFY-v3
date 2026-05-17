export const downloadJSON = (result) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `unify-${result.category}-${result.id.slice(0, 8)}.json`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const downloadCSV = (result) => {
  const headers = Object.keys(result).join(',');
  const values = Object.values(result).map(v => typeof v === 'object' ? JSON.stringify(v) : v).join(',');
  const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + values;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `unify-${result.category}-${result.id.slice(0, 8)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const downloadTXT = (result) => {
  const content = `TITLE: ${result.title}\nSOURCE: ${result.source}\nCATEGORY: ${result.category}\nURL: ${result.url}\n\nDESCRIPTION:\n${result.description || 'No description available'}`;
  const element = document.createElement("a");
  const file = new Blob([content], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = `unify-${result.category}-${result.id.slice(0, 8)}.txt`;
  document.body.appendChild(element);
  element.click();
  element.remove();
};
