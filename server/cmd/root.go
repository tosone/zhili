package cmd

import (
	"fmt"

	"github.com/tosone/zhili/server/cmd/version"

	"github.com/Unknwon/com"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/tosone/logging"
	"github.com/tosone/zhili/server/cmd/server"
)

func init() {
	var config string

	var serverCmd = &cobra.Command{
		Use:   "server",
		Short: "Travel all of the github organizations, users and repositories.",
		Long:  `Travel all of the github organizations, users and repositories.`,
		Args:  cobra.MinimumNArgs(0),
		Run: func(_ *cobra.Command, _ []string) {
			var err error
			if err = server.Initialize(); err != nil {
				fmt.Printf("Got error: %+v\n", err)
			}
		},
	}
	serverCmd.PersistentFlags().StringVarP(&config, "config", "c", "./config.yml", "config file")

	RootCmd.AddCommand(serverCmd) // crawler commander

	var versionCmd = &cobra.Command{
		Use:   "version",
		Short: "Get version",
		Long:  `The version that build detail information.`,
		Run: func(_ *cobra.Command, _ []string) {
			version.Initialize()
		},
	}
	RootCmd.AddCommand(versionCmd) // version commander

	viper.SetConfigType("yaml")
	if com.IsFile(config) {
		viper.SetConfigFile(config)
	} else {
		logging.Fatal("Cannot find config file. Please check.")
	}
	if err := viper.ReadInConfig(); err != nil {
		logging.Panic("Cannot find the special config file.")
	}

	RootCmd.Use = viper.GetString("AppName")
}

// RootCmd represents the base command when called without any sub commands
var RootCmd = &cobra.Command{
	Short: "Travel all of the github organizations, users and repositories.",
	Long:  `Travel all of the github organizations, users and repositories.`,
}