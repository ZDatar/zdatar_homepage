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
const SPREADSHEET_ID = '1pJnV5nFDn88OcPL1axnKzhJWSIFdt0yxlaCw1tsOa_0';
const SHEET_NAME = 'Waitlist'; // Name of the sheet tab

// Test function to verify connection
function testConnection() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Spreadsheet found:', spreadsheet.getName());
    
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (sheet) {
      console.log('Sheet found:', SHEET_NAME);
      console.log('Last row:', sheet.getLastRow());
      
      // Add a test row
      sheet.appendRow([new Date(), 'test@example.com', 'Manual Test', 'Active']);
      console.log('Test row added successfully');
    } else {
      console.log('Sheet not found:', SHEET_NAME);
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

function doPost(e) {
  console.log('=== doPost function called ===');
  console.log('Full request object:', JSON.stringify(e, null, 2));
  
  try {
    // Check if postData exists
    if (!e.postData || !e.postData.contents) {
      console.error('No postData found in request');
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'No data received'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    console.log('Raw postData contents:', e.postData.contents);
    console.log('PostData type:', typeof e.postData.contents);
    
    // Parse the incoming data
    let data;
    try {
      data = JSON.parse(e.postData.contents);
      console.log('Successfully parsed data:', JSON.stringify(data, null, 2));
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Raw content that failed to parse:', e.postData.contents);
      throw new Error('Invalid JSON: ' + parseError.message);
    }
    
    const email = data.email;
    const timestamp = data.timestamp;
    const source = data.source || 'Unknown';
    
    console.log('Extracted values:', { email, timestamp, source });
    
    // Open the spreadsheet
    console.log('Opening spreadsheet with ID:', SPREADSHEET_ID);
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Spreadsheet opened successfully:', spreadsheet.getName());
    
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    console.log('Looking for sheet:', SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      console.log('Sheet not found, creating new sheet');
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Add headers
      sheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'Email', 'Source', 'Status']]);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
      console.log('New sheet created with headers');
    } else {
      console.log('Sheet found successfully');
    }
    
    // Check if email already exists (only if there are rows beyond header)
    let emailExists = false;
    const lastRow = sheet.getLastRow();
    console.log('Sheet last row:', lastRow);
    
    if (lastRow > 1) {
      // Only check for duplicates if there are actual data rows
      const numDataRows = lastRow - 1;
      console.log('Number of data rows to check:', numDataRows);
      
      if (numDataRows > 0) {
        const emailColumn = sheet.getRange(2, 2, numDataRows, 1).getValues();
        console.log('Existing emails:', emailColumn);
        emailExists = emailColumn.some(row => row[0] === email);
        console.log('Email exists check:', emailExists);
      }
    } else {
      console.log('Sheet is empty (only headers), no duplicate check needed');
    }
    
    if (emailExists) {
      console.log('Email already exists, returning early');
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
    console.log('Row added successfully:', newRow);
    
    // Format the new row
    const newLastRow = sheet.getLastRow();
    sheet.getRange(newLastRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    console.log('Row formatted at position:', newLastRow);
    
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
