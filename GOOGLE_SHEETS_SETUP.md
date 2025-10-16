# Google Sheets Waitlist Setup Guide

This guide will help you set up Google Sheets integration for your ZDatar waitlist.

## 📋 **Step 1: Create Google Sheets**

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "ZDatar Waitlist" (or any name you prefer)
4. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```

## 🔧 **Step 2: Set Up Google Apps Script**

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New Project"**
3. Delete the default `myFunction()` code
4. Copy and paste the code from `google-apps-script.js`
5. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual Spreadsheet ID
6. Save the project (Ctrl/Cmd + S)
7. Name your project "ZDatar Waitlist API"

## 🚀 **Step 3: Deploy as Web App**

1. In Google Apps Script, click **"Deploy"** → **"New Deployment"**
2. Click the gear icon ⚙️ next to "Type"
3. Select **"Web app"**
4. Set the following:
   - **Description**: "ZDatar Waitlist API"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
5. Click **"Deploy"**
6. **Copy the Web App URL** (it looks like: `https://script.google.com/macros/s/.../exec`)

## 🔗 **Step 4: Configure Environment Variables**

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file
3. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your Web App URL from Step 3:
   ```bash
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec
   ```

## ✅ **Step 5: Test the Integration**

1. Open your website
2. Enter an email in the waitlist form
3. Click "Notify Me"
4. Check your Google Sheets - you should see:
   - **Column A**: Timestamp
   - **Column B**: Email address
   - **Column C**: Source ("ZDatar Landing Page")
   - **Column D**: Status ("Active")

## 📊 **What Gets Stored**

Your Google Sheet will automatically collect:

| Timestamp | Email | Source | Status |
|-----------|-------|---------|---------|
| 2025-10-16 16:30:45 | user@example.com | ZDatar Landing Page | Active |
| 2025-10-16 16:45:12 | another@email.com | ZDatar Landing Page | Active |

## 🛠️ **Features Included**

- ✅ **Duplicate prevention** - Won't add the same email twice
- ✅ **Automatic formatting** - Timestamps and column sizing
- ✅ **Error handling** - Graceful failure if Google Sheets is down
- ✅ **Local backup** - Still saves to localStorage as backup
- ✅ **Source tracking** - Knows emails came from your landing page

## 🔒 **Security & Privacy**

- The Google Apps Script runs under your Google account
- Only you can access the spreadsheet data
- The web app URL is public but doesn't expose your data
- Emails are stored securely in Google Sheets

## 🚨 **Troubleshooting**

### **"Script not found" error**
- Make sure you deployed the script as a web app
- Check that "Who has access" is set to "Anyone"

### **"Permission denied" error**
- The script needs permission to access Google Sheets
- Run the script once manually in the Apps Script editor
- Grant the required permissions

### **Emails not appearing in sheets**
- Check the browser console for error messages
- Verify the Spreadsheet ID is correct
- Make sure the Web App URL is correct in your HTML

### **Testing the API directly**
You can test your Google Apps Script by visiting the Web App URL directly in your browser. You should see:
```json
{
  "message": "ZDatar Waitlist API is running",
  "timestamp": "2025-10-16T08:30:45.123Z"
}
```

## 📈 **Next Steps**

Once set up, you can:
- Export emails from Google Sheets to CSV
- Set up email notifications when new signups occur
- Create charts and analytics in Google Sheets
- Import emails into your email marketing platform

## 🔄 **Updating the Script**

If you need to make changes:
1. Edit the code in Google Apps Script
2. Save the changes
3. Deploy a new version (Deploy → Manage Deployments → Edit → Deploy)
4. The URL stays the same, so no need to update your website
