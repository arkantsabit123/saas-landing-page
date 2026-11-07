function doPost(e) {
  try {
    // GANTI DENGAN ID SPREADSHEET ANDA
    const SPREADSHEET_ID = "1lrMWbHqRvbl0Sgl4cWf7WjKRQyIHiYbDhlwTFdRT4-s"; 
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName('Leads');
    
    // Karena frontend sekarang mengirim sebagai URLSearchParams, 
    // datanya ada di e.parameter (bukan e.postData.contents)
    const data = e.parameter; 
    
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.company || '',
      data.message || '',
      data.source || 'landing-page',
    ]);
    
    // Mengembalikan respon sukses
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// FUNGSI WAJIB UNTUK MENGATASI CORS (Preflight Request)
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}