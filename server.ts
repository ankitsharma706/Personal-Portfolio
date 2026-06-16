/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set higher payload size limit for base64 image streams
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Secure API key configuration check endpoint (mocked to always be ready)
  app.get("/api/gemini/ready", (req, res) => {
    return res.json({ ready: true });
  });

  // Real-time AI System Synthesis Route (Mocked)
  app.post("/api/gemini/synthesize-system", async (req, res) => {
    try {
      const { problem } = req.body;
      if (!problem || typeof problem !== "string" || problem.trim().length === 0) {
        return res.status(400).json({ error: "A clear system problem statement is required." });
      }

      console.log(`Firing Mock System Synthesis for problem: "${problem.substring(0, 50)}..."`);

      // Artificial delay to simulate processing
      await new Promise(r => setTimeout(r, 1500));

      const synthesizedData = {
        title: "Mocked Veridian Heavy-Cargo Orchestrator",
        tagline: "Free tier mocked system for local testing",
        overview: "This is a mocked architectural response since the Gemini API key was removed. It simulates horizontal scaling boundaries, network tiers, and cache policies for your provided problem.",
        components: [
          {
            name: "Mock Edge Gateway",
            category: "Edge",
            specs: ["Jaro-Winkler fuzzy matching", "TLS 1.3 Termination", "Rate Limiting"],
            latency: "5ms",
            protocol: "HTTPS"
          },
          {
            name: "Mock Core Processor",
            category: "Compute",
            specs: ["Idempotency locks", "Reentrancy guards", "Protobuf compression"],
            latency: "15ms",
            protocol: "gRPC"
          },
          {
            name: "Mock Ledger DB",
            category: "Storage",
            specs: ["WAL indexes", "Ledger immutability", "Multi-AZ replication"],
            latency: "2ms",
            protocol: "TCP"
          },
          {
            name: "Mock In-Memory Cache",
            category: "Memory",
            specs: ["Eviction policies", "Pub/Sub", "State synchronization"],
            latency: "1ms",
            protocol: "Redis/TCP"
          },
          {
            name: "Mock Auth Service",
            category: "Security",
            specs: ["BIP-44 key hierarchies", "OAuth 2.0", "MFA validation"],
            latency: "10ms",
            protocol: "HTTPS"
          }
        ],
        dataFlow: [
          { from: "Mock Edge Gateway", to: "Mock Auth Service", label: "Authenticate Request" },
          { from: "Mock Edge Gateway", to: "Mock Core Processor", label: "Forward Request" },
          { from: "Mock Core Processor", to: "Mock In-Memory Cache", label: "Check Cache" },
          { from: "Mock Core Processor", to: "Mock Ledger DB", label: "Read/Write Data" }
        ],
        fiduciaryPath: "Mocked fiduciary path: Securely handles standard fiat or stablecoins with Plaid credentials, ACH settlement speeds, bank reserves, and token mint/burn logic.",
        riskMitigation: "Mocked risk mitigation: Details how failure domains, data loss, fraud patterns, and OFAC/national sanction checks are handled."
      };

      return res.json({
        success: true,
        data: synthesizedData
      });

    } catch (err: any) {
      console.error("Critical System Synthesis failure:", err);
      return res.status(500).json({
        error: "System Synthesis Failed",
        message: err.message || "An exception occurred inside the server-side AI compilation engine."
      });
    }
  });

  // Main Image Creation & Editing Route (Mocked)
  app.post("/api/gemini/generate-image", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "The prompt text is required to generate or edit an image." });
      }

      console.log(`Mocking Image Generation for prompt: ${prompt.substring(0, 50)}...`);

      // Artificial delay to simulate processing
      await new Promise(r => setTimeout(r, 2000));

      // Return a dummy 1x1 pixel transparent PNG
      const mockBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

      return res.json({
        success: true,
        imageData: `data:image/png;base64,${mockBase64}`,
        rawBase64: mockBase64,
        modelUsed: "mock-free-image",
        textFeedback: "Mocked image generated successfully (free tier)."
      });

    } catch (err: any) {
      console.error("Gemini API generation error:", err);
      return res.status(500).json({
        error: "Generation Failed",
        message: err.message || "An exception occurred inside the server-side Google GenAI handler."
      });
    }
  });

  // Setup the SPA pipeline
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Mounted Vite middleware inside Express container.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving compiled static assets from dist folder.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Fullstack container listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical failure during backend container startup:", err);
  process.exit(1);
});
