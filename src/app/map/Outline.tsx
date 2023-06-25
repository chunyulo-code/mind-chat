"use client";
import React from "react";
import ReactMarkdown from "react-markdown";

export default function Outline() {
  const mdData = `
# Backend Roadmap ## Programming Languages - Python - Java - PHP - Node.js ## Databases - Relational Databases - NoSQL Databases - SQL vs NoSQL - Database Design ## API Development - RESTful API - GraphQL - API Design ## Frameworks ### Python - Django - Flask - Pyramid ### Java - Spring - Hibernate - Struts ### PHP - Laravel - Symfony - Yii ### Node.js - Express - Koa - Nest ## DevOps - Cloud Computing - Continuous Integration / Continuous Deployment (CI/CD) - Deployment - Monitoring - Containers ## Security - Encryption - Authentication - Authorization - OWASP Security Risks ## Testing - Unit Testing
  `;
  const input = `# Backend Roadmap ## Programming Languages - Python - Java - PHP - Node.js ## Databases - Relational Databases - NoSQL Databases`;
  const ouput = [
    {
      id: "Backend Roadmap 的 nanoid()",
      type: "custom",
      data: { label: "Backend Roadmap" },
      parentNode: null,
      position: {
        x: 200,
        y: 0
      }
    },
    {
      id: "Programming Languages 的 nanoid()",
      type: "custom",
      data: { label: "Programming Languages" },
      parentNode: "Backend Roadmap 的 nanoid()",
      position: {
        x: 200,
        y: 0
      }
    },
    {
      id: "Python 的 nanoid()",
      type: "custom",
      data: { label: "Python" },
      parentNode: "Programming Languages 的 nanoid()",
      position: {
        x: 200,
        y: -300
      }
    },
    {
      id: "Java 的 nanoid()",
      type: "custom",
      data: { label: "Java" },
      parentNode: "Programming Languages 的 nanoid()",
      position: {
        x: 200,
        y: -100
      }
    },
    {
      id: "PHP 的 nanoid()",
      type: "custom",
      data: { label: "PHP" },
      parentNode: "Programming Languages 的 nanoid()",
      position: {
        x: 200,
        y: 100
      }
    },
    {
      id: "Node.js 的 nanoid()",
      type: "custom",
      data: { label: "Node.js" },
      parentNode: "Programming Languages 的 nanoid()",
      position: {
        x: 200,
        y: 300
      }
    },
    {
      id: "Databases 的 nanoid()",
      type: "custom",
      data: { label: "Databases" },
      parentNode: "Backend Roadmap 的 nanoid()",
      position: {
        x: 200,
        y: 0
      }
    },
    {
      id: "Relational Databases 的 nanoid()",
      type: "custom",
      data: { label: "Relational Databases" },
      parentNode: "Databases 的 nanoid()",
      position: {
        x: 200,
        y: -100
      }
    },
    {
      id: "NoSQL Databases 的 nanoid()",
      type: "custom",
      data: { label: "NoSQL Databases" },
      parentNode: "Databases 的 nanoid()",
      position: {
        x: 200,
        y: 100
      }
    }
  ];

  function formatString(oldString) {
    const newString = oldString.replace(/(\#+|\-+)/g, "\n$1");
    return newString;
  }

  const formattedData = formatString(mdData);
  // console.log(formattedData);

  return (
    <>
      {/* <ReactMarkdown className="prose">{formattedData}</ReactMarkdown> */}
    </>
  );
}
