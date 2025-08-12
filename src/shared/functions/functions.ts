import * as Papa from 'papaparse';

import * as JSZip from 'jszip';

export function uploadRallyQuestions(event: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return reject('No file selected');
    }

    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const csvText = reader.result as string;

      const result = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        quoteChar: '"',
        delimiter: ',',
      });

      if (result.errors.length) {
        console.error('CSV Parsing Errors:', result.errors);
        return reject('Error parsing CSV');
      }

      console.log('Parsed CSV Data:', result.data);

      localStorage.setItem('rallyQuestions', JSON.stringify(result.data));
      input.value = '';
      resolve();
    };

    reader.onerror = (error) => {
      reject('FileReader Error: ' + error);
    };

    reader.readAsText(file);
  });
}

export function arrayToJson(data: any[]): string {
  return JSON.stringify(data, null, 2); // Pretty-print with 2-space indentation
}

export function csvToJson(csv: string): any[] {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim());
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });
}

export function convertToCSV(
  fileName: string,
  convertToCsvArray: any[]
): string {
  var array: any = [];
  for (let i = 0; i < convertToCsvArray.length; i++) {
    var o;
    var newArry: any = [];
    for (o in convertToCsvArray[i]) {
      newArry.push(o);
    }
    break;
  }
  array.push(newArry);
  for (let i = 0; i < convertToCsvArray.length; i++) {
    array.push(Object.values(convertToCsvArray[i]));
  }
  var CsvString = '';
  array.forEach((RowItem: any) => {
    RowItem.forEach((colItem: any) => {
      const removednullItem = colItem === null ? '' : colItem;
      const replacedCommaItem = removednullItem.toString().replace(/,/g, '');
      CsvString += replacedCommaItem + ',';
    });
    CsvString += '\r\n';
  });
  CsvString = 'data:application/csv, ' + encodeURIComponent(CsvString);
  var x = document.createElement('a');
  x.setAttribute('href', CsvString);
  x.setAttribute('download', fileName);
  document.body.appendChild(x);
  x.click();
  array = [];
  return CsvString;
}

export function convertToCsv2(data: any[]): string {
  if (!Array.isArray(data) || data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','), // header row
    ...data.map((row) =>
      headers.map((field) => JSON.stringify(row[field] ?? '')).join(',')
    ),
  ];

  return csvRows.join('\r\n');
}

export function convertJsonToCsv(jsonKey: string): string {
  const jsonData = [jsonKey]; // Assuming `this.json1` and `this.json2` are arrays of objects
  if (!Array.isArray(jsonData) || jsonData.length === 0) return '';

  const headers = Object.keys(jsonData[0]);
  const csvRows = [
    headers.join(','), // header row
    ...jsonData.map((row) =>
      headers.map((field: any) => JSON.stringify(row[field] ?? '')).join(',')
    ),
  ];

  return csvRows.join('\r\n');
}

export async function extractCsvsFromZip(
  event: any
): Promise<Record<string, any[]>> {
  return new Promise(async (resolve, reject) => {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return reject('No ZIP file selected');
    }

    const zipFile = input.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const zip = await JSZip.loadAsync(reader.result as ArrayBuffer);
        const result: Record<string, any[]> = {};

        console.log('Result: ', reader.result);

        const csvFiles = Object.keys(zip.files).filter((name) =>
          name.endsWith('.csv')
        );

        if (csvFiles.length === 0) {
          return reject('No CSV files found in the ZIP');
        }

        console.log("CSV Files: ", csvFiles);

        let areCorrectFiles: boolean =
          csvFiles.length == 2 &&
          (csvFiles[0].includes('rallyquestions')) &&
          (csvFiles[1].includes('rumblers'))
            ? true
            : false;

        if (!areCorrectFiles) {
          console.log('Wrong files!');
          return;
        }

        for (const fileName of csvFiles) {
          const fileData = await zip.files[fileName].async('string');

          const parsed = Papa.parse(fileData, {
            header: true,
            skipEmptyLines: true,
          });

          if (parsed.errors.length > 0) {
            console.error(`Error parsing ${fileName}:`, parsed.errors);
            return reject(`Parsing error in ${fileName}`);
          }

          let localStorageKey = fileName.includes('rallyquestions')
            ? 'rallyQuestions'
            : 'rumblerInfo';

          // Store in localStorage or return as object
          localStorage.setItem(localStorageKey, JSON.stringify(parsed.data));
          result[fileName] = parsed.data;
        }

        input.value = '';
        resolve(result);
      } catch (err) {
        reject('ZIP extraction failed: ' + err);
      }
    };

    reader.onerror = () => {
      reject('Error reading ZIP file');
    };

    reader.readAsArrayBuffer(zipFile);
  });
}

export function clearAppData(){
  localStorage.clear();
  sessionStorage.clear();
}

export function isNullOrEmpty(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim().length === 0;
}