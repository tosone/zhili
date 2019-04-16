package main

import (
	"github.com/tosone/logging"
	"github.com/tosone/zhili/server/cmd"
	"github.com/tosone/zhili/server/cmd/version"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/lib/pq"
	_ "github.com/mattn/go-sqlite3"
)

// Version version command output msg
var Version = "no provided"

// BuildStamp version command output msg
var BuildStamp = "no provided"

// GitHash version command output msg
var GitHash = "no provided"

func main() {
	// set version command output
	version.Setting(Version, BuildStamp, GitHash)

	// init cobra commander
	if err := cmd.RootCmd.Execute(); err != nil {
		logging.Panic(err.Error())
	}
}
