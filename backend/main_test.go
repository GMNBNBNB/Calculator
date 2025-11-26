package main

import (
	"context"
	"testing"

	calculatorv1 "example/gen/proto/calculator/v1"

	"connectrpc.com/connect"
)

func TestCalculatorServer_Add(t *testing.T) {
	server := &CalculatorServer{}
	req := connect.NewRequest(&calculatorv1.CalculateRequest{
		A:  10,
		B:  5,
		Op: calculatorv1.Operation_OPERATION_ADD,
	})

	resp, err := server.Calculate(context.Background(), req)
	if err != nil {
		t.Fatalf("Calculate failed: %v", err)
	}

	expected := 15.0
	if resp.Msg.Result != expected {
		t.Errorf("Expected %f, got %f", expected, resp.Msg.Result)
	}
}

func TestCalculatorServer_Subtract(t *testing.T) {
	server := &CalculatorServer{}
	req := connect.NewRequest(&calculatorv1.CalculateRequest{
		A:  10,
		B:  5,
		Op: calculatorv1.Operation_OPERATION_SUBTRACT,
	})

	resp, err := server.Calculate(context.Background(), req)
	if err != nil {
		t.Fatalf("Calculate failed: %v", err)
	}

	expected := 5.0
	if resp.Msg.Result != expected {
		t.Errorf("Expected %f, got %f", expected, resp.Msg.Result)
	}
}

func TestCalculatorServer_Multiply(t *testing.T) {
	server := &CalculatorServer{}
	req := connect.NewRequest(&calculatorv1.CalculateRequest{
		A:  10,
		B:  5,
		Op: calculatorv1.Operation_OPERATION_MULTIPLY,
	})

	resp, err := server.Calculate(context.Background(), req)
	if err != nil {
		t.Fatalf("Calculate failed: %v", err)
	}

	expected := 50.0
	if resp.Msg.Result != expected {
		t.Errorf("Expected %f, got %f", expected, resp.Msg.Result)
	}
}

func TestCalculatorServer_Divide(t *testing.T) {
	server := &CalculatorServer{}
	req := connect.NewRequest(&calculatorv1.CalculateRequest{
		A:  10,
		B:  5,
		Op: calculatorv1.Operation_OPERATION_DIVIDE,
	})

	resp, err := server.Calculate(context.Background(), req)
	if err != nil {
		t.Fatalf("Calculate failed: %v", err)
	}

	expected := 2.0
	if resp.Msg.Result != expected {
		t.Errorf("Expected %f, got %f", expected, resp.Msg.Result)
	}
}

func TestCalculatorServer_DivideByZero(t *testing.T) {
	server := &CalculatorServer{}
	req := connect.NewRequest(&calculatorv1.CalculateRequest{
		A:  10,
		B:  0,
		Op: calculatorv1.Operation_OPERATION_DIVIDE,
	})

	_, err := server.Calculate(context.Background(), req)
	if err == nil {
		t.Fatal("Expected error for division by zero, got nil")
	}

	if connect.CodeOf(err) != connect.CodeInvalidArgument {
		t.Errorf("Expected InvalidArgument error code, got %v", connect.CodeOf(err))
	}
}

func TestCalculatorServer_UnknownOperation(t *testing.T) {
	server := &CalculatorServer{}
	req := connect.NewRequest(&calculatorv1.CalculateRequest{
		A:  10,
		B:  5,
		Op: calculatorv1.Operation_OPERATION_UNSPECIFIED,
	})

	_, err := server.Calculate(context.Background(), req)
	if err == nil {
		t.Fatal("Expected error for unknown operation, got nil")
	}

	if connect.CodeOf(err) != connect.CodeInvalidArgument {
		t.Errorf("Expected InvalidArgument error code, got %v", connect.CodeOf(err))
	}
}
