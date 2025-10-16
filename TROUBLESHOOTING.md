# Google Sheets Integration Troubleshooting

If emails are not appearing in your Google Sheet, follow these steps:

## 🔍 **Step 1: Check Browser Console**

1. Open Chrome DevTools (F12)
2. Go to Console tab
3. Submit a test email
4. Look for these messages:

### ✅ **Good Signs:**
```
Attempting to send to Google Sheets...
URL: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
Email: test@example.com
Sending payload: {email: "test@example.com", timestamp: "...", source: "ZDatar Landing Page"}
Response received (no-cors mode - limited info available)
Email sent to Google Sheets: test@example.com
```

### ❌ **Bad Signs:**
```
Google Script URL not configured properly
Failed to send to Google Sheets: Error...
```

## 🔧 **Step 2: Verify Google Apps Script Setup**

### **Check Spreadsheet ID**
1. Open your Google Sheet
2. Copy the ID from URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
3. In Google Apps Script, verify `SPREADSHEET_ID` matches exactly

### **Check Deployment**
1. In Google Apps Script, go to **Deploy** → **Manage Deployments**
2. Verify:
   - **Type**: Web app
   - **Execute as**: Me
   - **Who has access**: Anyone
3. Copy the **Web App URL** (should end with `/exec`)

### **Test the Script Directly**
1. Visit your Google Apps Script Web App URL in browser
2. You should see: `{"message": "ZDatar Waitlist API is running", "timestamp": "..."}`
3. If you get an error, the deployment isn't working

## 🛠️ **Step 3: Common Fixes**

### **Fix 1: Redeploy Google Apps Script**
1. In Google Apps Script, make a small change (add a comment)
2. Save the script
3. Go to **Deploy** → **New Deployment**
4. Deploy as Web App again
5. Update your `.env` file with the new URL

### **Fix 2: Check Permissions**
1. In Google Apps Script, click **Run** on the `doPost` function
2. Grant all requested permissions
3. Make sure you authorize access to Google Sheets

### **Fix 3: Verify Sheet Name**
1. In your Google Sheet, check the tab name (bottom left)
2. In Google Apps Script, verify `SHEET_NAME` matches exactly
3. Default is `'Waitlist'` - case sensitive!

### **Fix 4: Check Spreadsheet Permissions**
1. Make sure you own the Google Sheet
2. The Google Apps Script must run under the same Google account

## 📊 **Step 4: Manual Testing**

### **Test Google Apps Script Directly**
1. In Google Apps Script, go to **Executions** tab
2. You should see executions when emails are submitted
3. Click on executions to see logs and errors

### **Test with Postman/curl**
```bash
curl -X POST "YOUR_GOOGLE_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","timestamp":"2025-10-16T10:00:00.000Z","source":"Manual Test"}'
```

## 🔍 **Step 5: Debug Logs**

### **View Google Apps Script Logs**
1. In Google Apps Script, go to **Executions**
2. Click on recent executions
3. Look for console.log outputs and errors

### **Expected Log Output:**
```
doPost function called
Request data: {...}
Raw postData contents: {"email":"test@example.com",...}
Parsed data: {...}
Extracted values: {...}
```

## 🚨 **Common Issues & Solutions**

### **Issue: "Script not found"**
- **Solution**: Redeploy the Google Apps Script as a web app
- Make sure "Who has access" is set to "Anyone"

### **Issue: "Permission denied"**
- **Solution**: Run the script manually once to grant permissions
- Make sure you're using the same Google account for both Sheet and Script

### **Issue: "Spreadsheet not found"**
- **Solution**: Double-check the `SPREADSHEET_ID` in your Google Apps Script
- Make sure the spreadsheet exists and you have access

### **Issue: No logs in Google Apps Script**
- **Solution**: The script isn't receiving requests
- Check if the URL in your `.env` file is correct
- Make sure it ends with `/exec`

### **Issue: Emails appear but with wrong data**
- **Solution**: Check the payload format in browser console
- Verify the Google Apps Script is parsing data correctly

## ✅ **Verification Checklist**

- [ ] Google Sheet exists and is accessible
- [ ] Google Apps Script has correct `SPREADSHEET_ID`
- [ ] Google Apps Script is deployed as web app with "Anyone" access
- [ ] `.env` file has correct Google Apps Script URL ending with `/exec`
- [ ] Browser console shows successful API calls
- [ ] Google Apps Script executions tab shows recent activity
- [ ] Permissions granted for Google Apps Script to access Sheets

## 🔄 **Quick Reset**

If nothing works, try this complete reset:

1. **Delete** the Google Apps Script project
2. **Create** a new Google Apps Script project
3. **Copy** the code from `google-apps-script.js`
4. **Update** the `SPREADSHEET_ID`
5. **Deploy** as new web app
6. **Update** your `.env` file with new URL
7. **Rebuild** Docker container: `docker-compose up --build -d`
