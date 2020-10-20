<?php
/**
 * As configurações básicas do WordPress
 *
 * O script de criação wp-config.php usa esse arquivo durante a instalação.
 * Você não precisa usar o site, você pode copiar este arquivo
 * para "wp-config.php" e preencher os valores.
 *
 * Este arquivo contém as seguintes configurações:
 *
 * * Configurações do MySQL
 * * Chaves secretas
 * * Prefixo do banco de dados
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Configurações do MySQL - Você pode pegar estas informações com o serviço de hospedagem ** //
/** O nome do banco de dados do WordPress */

@ini_set ('upload_max_filesize', '300M');
@ini_set ('post_max_size', '300M');
@ini_set ('memory_limit', '256M');
@ini_set ('max_execution_time', '300');
@ini_set ('max_input_time', '300');

define( 'DB_NAME', '' );


/** Usuário do banco de dados MySQL */
define( 'DB_USER', '' );


/** Senha do banco de dados MySQL */
define( 'DB_PASSWORD', '' );


/** Nome do host do MySQL */
define( 'DB_HOST', '' );


/** Charset do banco de dados a ser usado na criação das tabelas. */
define( 'DB_CHARSET', 'utf8mb4' );


/** O tipo de Collate do banco de dados. Não altere isso se tiver dúvidas. */
define( 'DB_COLLATE', '' );

/**#@+
 * Chaves únicas de autenticação e salts.
 *
 * Altere cada chave para um frase única!
 * Você pode gerá-las
 * usando o {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org
 * secret-key service}
 * Você pode alterá-las a qualquer momento para invalidar quaisquer
 * cookies existentes. Isto irá forçar todos os
 * usuários a fazerem login novamente.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'pDVMnG=rx9Mw-YGa]tTAp{T4{|2uB]bSxC^*#8!lSTs]}HXV0aSOWM>6F$Maie9m' );

define( 'SECURE_AUTH_KEY',  'RM-6Qu*,ZfR{Ya[pry*`PY`AYAN{2BSxhHnx.jlHIG^/<N!T)N/GR7Uj}DR1n:1J' );

define( 'LOGGED_IN_KEY',    'O`euJ?m%$Ay$2KLw3c !c_Dnh5NN[j_Xc~$S8g+9wczL(^GatCGw9g,84Mt+n[*s' );

define( 'NONCE_KEY',        '_/HE)p5Po<OEwS )gTi+6DZ#g W{*YYC?_U9AHBS=1-15WzVb{fBGCJ,M(+_JkrL' );

define( 'AUTH_SALT',        '}M/t U6&#,cA)cl<r~*%HX2DPgi@Y`a1-4t1|=0/#^RIy&+Ke2t~-6]~wTK$5Odg' );

define( 'SECURE_AUTH_SALT', 'JG?q-o6]ai;)}*J4Igt -J=;nB625LztsGil)gVdE{!4uXu&* o|Gi:.9%%jd~[t' );

define( 'LOGGED_IN_SALT',   '*7sUY3`&q;-VlR8NoJX-3LyT29SRM.<c,RD;W^HUtrCF|`,7q0ul_b8 Rp`e:/x<' );

define( 'NONCE_SALT',       'J2sthJ0b,@}o!dd]u5(0j6lW|vLlb!TVUrp*+RJ%0Q|xu||P>nl)4Uz(q?k)&F?u' );


/**#@-*/

/**
 * Prefixo da tabela do banco de dados do WordPress.
 *
 * Você pode ter várias instalações em um único banco de dados se você der
 * um prefixo único para cada um. Somente números, letras e sublinhados!
 */
$table_prefix = 'wp_';


/**
 * Para desenvolvedores: Modo de debug do WordPress.
 *
 * Altere isto para true para ativar a exibição de avisos
 * durante o desenvolvimento. É altamente recomendável que os
 * desenvolvedores de plugins e temas usem o WP_DEBUG
 * em seus ambientes de desenvolvimento.
 *
 * Para informações sobre outras constantes que podem ser utilizadas
 * para depuração, visite o Codex.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Isto é tudo, pode parar de editar! :) */

/** Caminho absoluto para o diretório WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Configura as variáveis e arquivos do WordPress. */
require_once ABSPATH . 'wp-settings.php';
