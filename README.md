<div align="center">

# CloudSync

**Serverless Cloud File Storage and Sharing Platform**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_App-2563eb?style=for-the-badge)](http://cloudsync-public.s3-website.ap-south-1.amazonaws.com/)
[![AWS](https://img.shields.io/badge/AWS-Serverless-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)
[![Status](https://img.shields.io/badge/Status-Live-22c55e?style=for-the-badge)]()

Upload. Share. Sync. — Your files, anywhere, anytime.

[Live Demo](http://cloudsync-public.s3-website.ap-south-1.amazonaws.com/) &nbsp;|&nbsp; [Features](#features) &nbsp;|&nbsp; [Architecture](#architecture) &nbsp;|&nbsp; [Tech Stack](#tech-stack) &nbsp;|&nbsp; [Team](#team)

</div>

---

## Overview

CloudSync is a full-stack serverless web application that allows users to securely upload, download, share, and manage files in the cloud. Built entirely on AWS serverless infrastructure — no servers to manage, no maintenance required, and runs efficiently using cloud-native services.

---

## Features

| Feature | Description |
|---|---|
| User Authentication | Secure signup, login, and email verification via AWS Cognito |
| Password Reset | OTP-based forgot password flow via Cognito |
| File Upload | Direct-to-S3 upload using pre-signed URLs |
| File Download | One-click secure download from any device |
| File Sharing | Generate instant shareable links — no account needed to download |
| File Delete | Remove files instantly from both S3 and DynamoDB |
| Dashboard | View total files, storage used, and manage everything in one place |
| Data Persistence | Files reload from DynamoDB after logout and login |
| AI Assistant | Built-in chatbot (Neeli) powered by OpenRouter to help users navigate the app |
| Responsive Design | Fully functional on desktop and mobile |

---

## Architecture
