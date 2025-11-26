package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"connectrpc.com/connect"
	"github.com/rs/cors"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	calculatorv1 "example/gen/calculator/v1"
	"example/gen/calculator/v1/calculatorv1connect"
)

type CalculatorServer struct{}

func (s *CalculatorServer) Calculate(
	ctx context.Context,
	req *connect.Request[calculatorv1.CalculateRequest],
) (*connect.Response[calculatorv1.CalculateResponse], error) {
	a := req.Msg.A
	b := req.Msg.B
	op := req.Msg.Op

	var res float64

	switch op {
	case calculatorv1.Operation_OPERATION_ADD:
		res = a + b
	case calculatorv1.Operation_OPERATION_SUBTRACT:
		res = a - b
	case calculatorv1.Operation_OPERATION_MULTIPLY:
		res = a * b
	case calculatorv1.Operation_OPERATION_DIVIDE:
		if b == 0 {
			return nil, connect.NewError(connect.CodeInvalidArgument, fmt.Errorf("division by zero"))
		}
		res = a / b
	default:
		return nil, connect.NewError(connect.CodeInvalidArgument, fmt.Errorf("unknown operation: %v", op))
	}

	return connect.NewResponse(&calculatorv1.CalculateResponse{
		Result: res,
	}), nil
}

func main() {
	mux := http.NewServeMux()
	path, handler := calculatorv1connect.NewCalculatorServiceHandler(&CalculatorServer{})
	mux.Handle(path, handler)

	// CORS setup
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"POST", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		ExposedHeaders:   []string{"Grpc-Status", "Grpc-Message", "Connect-Protocol-Version"},
		AllowCredentials: true,
	})

	fmt.Println("Server starting on :8080")
	// Use h2c so we can serve HTTP/2 without TLS.
	err := http.ListenAndServe(
		"localhost:8080",
		c.Handler(h2c.NewHandler(mux, &http2.Server{})),
	)
	if err != nil {
		log.Fatal(err)
	}
}
