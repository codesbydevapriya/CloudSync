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

CloudSync is a full-stack serverless web application that allows users to securely upload, download, share, and manage files in the cloud. Built entirely on AWS serverless infrastructure — no servers to manage, no maintenance required, and runs completely free on the AWS Free Tier.

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

```
Browser  -->  S3 Static Website (Frontend)
                      |
                      v
             Amazon Cognito (Auth)
                      |
                      v
             API Gateway (REST API)
                      |
          ____________|____________
         |            |            |
         v            v            v
    Lambda         Lambda       Lambda
    (Upload)      (Download)   (Delete/List)
         |            |            |
         v            v            v
       AWS S3      DynamoDB      AWS S3
      (Files)     (Metadata)    (Files)
```

---

## Tech Stack

**Frontend**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

**Backend — AWS Serverless**

![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?style=flat-square&logo=awslambda&logoColor=white)
![API Gateway](https://img.shields.io/badge/API_Gateway-FF4F8B?style=flat-square&logo=amazonaws&logoColor=white)
![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=flat-square&logo=amazondynamodb&logoColor=white)
![S3](https://img.shields.io/badge/Amazon_S3-569A31?style=flat-square&logo=amazons3&logoColor=white)
![Cognito](https://img.shields.io/badge/AWS_Cognito-DD344C?style=flat-square&logo=amazonaws&logoColor=white)
![CloudFront](https://img.shields.io/badge/CloudFront-232F3E?style=flat-square&logo=amazonaws&logoColor=white)

**AI**

![OpenRouter](https://img.shields.io/badge/OpenRouter-AI_Chatbot-6366f1?style=flat-square)

---

## AWS Services

| Service | Purpose |
|---|---|
| S3 (cloudsync-private) | Stores all uploaded files privately |
| S3 (cloudsync-public) | Hosts the frontend static website |
| DynamoDB (cloudsync) | Stores file metadata — name, size, email, upload date |
| Lambda (4 functions) | Serverless backend — upload, download, delete, list |
| API Gateway | REST API routing to Lambda functions |
| Cognito | User authentication, email verification, password reset |
| CloudFront | CDN for fast and secure global content delivery |

---

## Project Structure

```
CloudSync/
├── frontend/
│   ├── index.html            # Landing page
│   ├── login.html            # Authentication — sign in, sign up, forgot password
│   ├── dashboard.html        # File manager dashboard
│   ├── style.css             # Global styles
│   ├── cloudsync-bot.js      # Neeli AI chatbot widget
│   └── assets/
│       └── CloudSync_logo.png
│
└── lambda/
    ├── cloudsync-upload/     # Generates pre-signed PUT URL, saves metadata to DynamoDB
    ├── cloudsync-download/   # Generates pre-signed GET URL for download or sharing
    ├── cloudsync-delete/     # Deletes file from S3 and removes record from DynamoDB
    └── cloudsync-list/       # Fetches all files for a logged-in user from DynamoDB
```

---

## How It Works

1. User signs up and receives an email verification code from Cognito
2. On login, Cognito returns a JWT token stored in session storage
3. User uploads a file — Lambda generates a pre-signed S3 URL and the file uploads directly to S3
4. File metadata (name, size, email, timestamp) is saved to DynamoDB
5. User can share a file — Lambda generates a pre-signed GET URL accessible by anyone
6. On delete — Lambda removes the file from S3 and its record from DynamoDB
7. Files persist across sessions — reloaded from DynamoDB on every login

---

## AI Assistant — Neeli

CloudSync includes Neeli, a built-in AI assistant powered by OpenRouter (free tier). Neeli is available on all pages as a floating chat widget and can help users upload files, troubleshoot issues, and navigate the application.

---

## Live Demo

[http://cloudsync-public.s3-website.ap-south-1.amazonaws.com/](http://cloudsync-public.s3-website.ap-south-1.amazonaws.com/)

---

## Team

Final Year BCA Project — Izee Business School, 2026

| Name | GitHub |
|---|---|
| Abhijith AS | [@abhijithas20](https://github.com/abhijithas20) |
| Sreyas VM | [@codebysreyas](https://github.com/codebysreyas) |
| Devapriya KK | [@codesbydevapriya](https://github.com/codesbydevapriya) |

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
Built on AWS &nbsp;·&nbsp; © 2026 CloudSync &nbsp;·&nbsp; If you found this useful, consider starring the repo
</div>
