"use client";

import { useState } from "react";
import { client } from "../lib/client";
import { Operation } from "../gen/calculator/v1/calculator_pb";

export default function Home() {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [op, setOp] = useState<Operation>(Operation.ADD);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (a === "" || b === "") {
      setError("Please enter both numbers");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const response = await client.calculate({
        a: parseFloat(a),
        b: parseFloat(b),
        op,
      });
      setResult(response.result);
    } catch (e: any) {
      setError(e.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const getOperationSymbol = (op: Operation) => {
    switch (op) {
      case Operation.ADD: return "+";
      case Operation.SUBTRACT: return "-";
      case Operation.MULTIPLY: return "×";
      case Operation.DIVIDE: return "÷";
      default: return "?";
    }
  };

  return (
    <main style={{
      backgroundColor: "var(--card-bg)",
      padding: "2.5rem",
      borderRadius: "12px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      width: "100%",
      maxWidth: "400px",
    }}>
      <h1 style={{ 
        fontSize: "1.5rem", 
        fontWeight: "600", 
        marginBottom: "2rem", 
        textAlign: "center",
        color: "var(--foreground)"
      }}>
        ConnectRPC Calculator
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="Number A"
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              outline: "none",
              width: "0", // Fix flex overflow
            }}
          />
          
          <div style={{ position: "relative" }}>
            <select
              value={op}
              onChange={(e) => setOp(Number(e.target.value))}
              style={{
                appearance: "none",
                padding: "0.75rem 2rem 0.75rem 1rem",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                backgroundColor: "white",
                cursor: "pointer",
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              <option value={Operation.ADD}>+</option>
              <option value={Operation.SUBTRACT}>-</option>
              <option value={Operation.MULTIPLY}>×</option>
              <option value={Operation.DIVIDE}>÷</option>
            </select>
            <span style={{
              position: "absolute",
              right: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              fontSize: "0.8rem",
              color: "#666"
            }}>▼</span>
          </div>

          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="Number B"
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              outline: "none",
              width: "0", // Fix flex overflow
            }}
          />
        </div>

        <button 
          onClick={handleCalculate} 
          disabled={loading}
          style={{
            padding: "0.75rem",
            backgroundColor: loading ? "#ccc" : "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
          onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = "var(--primary)")}
        >
          {loading ? "Calculating..." : "Calculate"}
        </button>

        {error && (
          <div style={{ 
            padding: "0.75rem", 
            backgroundColor: "#ffebee", 
            color: "var(--error)", 
            borderRadius: "6px",
            fontSize: "0.9rem",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        {result !== null && !error && (
          <div style={{ 
            marginTop: "0.5rem",
            padding: "1.5rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            textAlign: "center",
            border: "1px solid var(--border)"
          }}>
            <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.5rem" }}>
              Result
            </div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary)" }}>
              {result}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
