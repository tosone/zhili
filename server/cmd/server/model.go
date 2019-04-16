package server

import "github.com/jinzhu/gorm"

type OpenID struct {
	gorm.Model `json:"-"`
	OpenID     string `json:"openid"`
	SessionKey string `json:"session_key"`
	UnionID    string `json:"unionid"`
	ErrCode    string `json:"errcode"`
	ErrMsg     string `json:"errmsg"`
}
