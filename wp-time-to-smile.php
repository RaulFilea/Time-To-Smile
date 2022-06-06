<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://github.com/RaulFilea/Time-To-Smile
 * @since             1.0.0
 * @package           Wp_TTS
 *
 * @wordpress-plugin
 * Plugin Name:       Time To Smile
 * Plugin URI:        https://github.com/RaulFilea/Time-To-Smile
 * Description:       Wordpress plugin to manage appointments and patients.
 * Version:           1.0.0
 * Author:            Raul Filea
 * Author URI:        https://github.com/RaulFilea/Time-To-Smile
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wp-time-to-smile
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'WP_TIME_TO_SMILE', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-wp-time-to-smile-activator.php
 */
function activate_wp_tts() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-wp-time-to-smile-activator.php';
	Wp_Time_To_Smile_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-wp-time-to-smile-deactivator.php
 */
function deactivate_wp_tts() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-wp-time-to-smile-deactivator.php';
	Wp_Time_To_Smile_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_wp_time_to_smile' );
register_deactivation_hook( __FILE__, 'deactivate_wp_time_to_smile' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-wp-medical-records.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_wp_medical_records() {

	$plugin = new Wp_Medical_Records();
	$plugin->run();

}
run_wp_medical_records();

