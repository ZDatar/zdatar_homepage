/**
 * Google Apps Script for ZDatar Waitlist
 * 
 * Instructions:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Save and deploy as a web app
 * 5. Copy the deployment URL to your HTML file
 */

// Replace with your Google Sheets ID (from the URL)
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Waitlist'; // Name of the sheet tab

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const timestamp = data.timestamp;
    const source = data.source || 'Unknown';
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Add headers
      sheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'Email', 'Source', 'Status']]);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
    }
    
    // Check if email already exists
    const emailColumn = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
    const emailExists = emailColumn.some(row => row[0] === email);
    
    if (emailExists) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Email already exists'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add new row with the data
    const newRow = [
      new Date(timestamp),
      email,
      source,
      'Active'
    ];
    
    sheet.appendRow(newRow);
    
    // Format the new row
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 4);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Email added successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Server error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Optional: Handle GET requests for testing
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'ZDatar Waitlist API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
