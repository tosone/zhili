package server

import "fmt"

var errCode = map[int]error{
	200:  fmt.Errorf("ok"),
	1001: fmt.Errorf("request weixin server got error"),
	1002: fmt.Errorf("server internal error"),
	1003: fmt.Errorf("params is not correct"),
}
