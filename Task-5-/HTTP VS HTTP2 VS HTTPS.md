# HTTP vs HTTP2 vs HTTPS Comparison

## Introduction
This document provides a comparison between HTTP, HTTP/2, and HTTPS protocols focusing on their purpose, technical differences, and real-world applications.

## Comparison Table

### Purpose of Each Protocol

| Protocol | Purpose |
|----------|----------------|
| HTTP | Creating HTTP servers to handle requests and send responses using HTTP methods -Get, Post, Put, Patch, Delete- |
| HTTP/2 | Creating more performant servers to handle requests and responses with binary format, improved speed, more capabilities and multiplexing over a single connection |
| HTTPS | Essential protocl for modern web apps, enabling the creation of secure servers using TLS/SSL with encrypted data transfer between client and server |

### Key Technical Differences

| Feature | HTTP/1.1 | HTTP/2 |
|---------|----------|--------|
| Connection Handling | One request per connection | Multiplexing over a single connection |
| Multiplexing | No | Yes |
| Server Push | No | Yes |
| Header Compression | No | Yes |
| Stream Prioritization | No | Yes |

![HTTP1 VS HTTP2](https://i.redd.it/rpj1us95tz6c1.png)

### Real-World Applications

## When to Choose HTTP
- Static Content Websites: When building sites with fixed pages and content (not dynamic) like portfolios and documentation websites.
- Simple APIs: When you build simple APIs with few endpoints that handle basic CRUD operations, so multiplexid isn't needed.
- When you need to transfer small amounts of data.
- When performance and priorities aren't a concern or don't matter to you.

## When to Choose HTTP/2
- When you need to handle multiple requests in parallel over a single connection without delays, like loading many images and texts simultaneously on one page.
- Media Streaming & Large Files: When you deal with a large amount of data like high-quality videos.
- When you want to improve the performance of your apps, especially mobile apps that require fast and smooth UX like e-commrece apps.
- When you need to prioritize the streaming of specific resources, like loading text content beforme images, videos, or ads. 

## When to Choose HTTPS
- When you need to store or transfer sensitive data like login credentials, financial data, or users' personal details.
- Platforms that require high security such as Banks, Login Pages, and E-Wallets.