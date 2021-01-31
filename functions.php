<?php 


define('B_THEME_PATH', get_template_directory_uri(  ));
define('B_CSS_PATH', B_THEME_PATH . '/build/css');
define('B_JS_PATH', B_THEME_PATH . '/build/js');


//подключение стилей и скриптов
add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style('bootstrap', B_CSS_PATH . '/bootstrap.min.css');
    wp_enqueue_style('control-style', B_CSS_PATH . '/main.css');
    wp_deregister_script( 'jquery' );
    wp_enqueue_script('jquery', B_JS_PATH . '/jquery.js');
    wp_enqueue_script('slick', B_JS_PATH . '/slick.min.js');
    wp_enqueue_script('maskedinput', B_JS_PATH . '/jquery.maskedinput.min.js');
    wp_enqueue_script('main', B_JS_PATH . '/main.js');
});


add_action( 'after_setup_theme', 'alm_remove_image_size', 1 );
add_action( 'init', 'register_post_types' );

//регтсрация новых полей
function register_post_types(){
	add_theme_support( 'post-thumbnails'); 

	//примеры 
	register_post_type( 'example', [
		'label'  => null,
		'labels' => [
			'name'               => 'Примеры', // основное название для типа записи
			'singular_name'      => 'Примеры', // название для одной записи этого типа
			'add_new'            => 'Добавить пример', // для добавления новой записи
			'add_new_item'       => 'Добавление нового примера', // заголовка у вновь создаваемой записи в админ-панели.
			'edit_item'          => 'Редактирование примера', // для редактирования типа записи
			'new_item'           => 'Текст примера', // текст новой записи
			'view_item'          => 'Смотреть примеры', // для просмотра записи этого типа.
			'search_items'       => 'Искать примеры', // для поиска по этим типам записи
			'not_found'          => 'Не найдено', // если в результате поиска ничего не было найдено
			'not_found_in_trash' => 'Не найдено в корзине', // если не было найдено в корзине
			'parent_item_colon'  => '', // для родителей (у древовидных типов)
			'menu_name'          => 'Примеры', // название меню
		],
		'public'              => false,
		'show_ui'             => true, 
		'menu_icon'           => null,
		'supports'            => [ 'title' , 'thumbnail'], // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
	] );

	// отзывы	
	register_post_type( 'reviews', [
		'label'  => null,
		'labels' => [
			'name'               => 'Отзывы', // основное название для типа записи
			'singular_name'      => 'Отзывы', // название для одной записи этого типа
			'add_new'            => 'Добавить отзыв', // для добавления новой записи
			'add_new_item'       => 'Добавление новый отзыв', // заголовка у вновь создаваемой записи в админ-панели.
			'edit_item'          => 'Редактирование отзыва', // для редактирования типа записи
			'new_item'           => 'Новое ____', // текст новой записи
			'view_item'          => 'Смотреть отзывы', // для просмотра записи этого типа.
			'search_items'       => 'Искать отзывы', // для поиска по этим типам записи
			'not_found'          => 'Не найдено', // если в результате поиска ничего не было найдено
			'not_found_in_trash' => 'Не найдено в корзине', // если не было найдено в корзине
			'parent_item_colon'  => '', // для родителей (у древовидных типов)
			'menu_name'          => 'Отзывы', // название меню
		],
		'public'              => false,
		'show_ui'             => true, 
		'menu_icon'           => null,
		'supports'            => [ 'title' , 'thumbnail'], // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
	]);

	//main
	register_post_type( 'static', [
		'label'  => null,
		'labels' => [
			'name'               => 'Установочные данные', // основное название для типа записи
			'singular_name'      => 'Установочные данные', // название для одной записи этого типа
			'add_new'            => 'Добавить Установочные данные', // для добавления новой записи
			'add_new_item'       => 'Добавление новый Установочные данные', // заголовка у вновь создаваемой записи в админ-панели.
			'edit_item'          => 'Редактирование Установочные данные', // для редактирования типа записи
			'new_item'           => 'Новое ____', // текст новой записи
			'view_item'          => 'Смотреть Установочные данные', // для просмотра записи этого типа.
			'search_items'       => 'Искать Установочные данные', // для поиска по этим типам записи
			'not_found'          => 'Не найдено', // если в результате поиска ничего не было найдено
			'not_found_in_trash' => 'Не найдено в корзине', // если не было найдено в корзине
			'parent_item_colon'  => '', // для родителей (у древовидных типов)
			'menu_name'          => 'Установочные данные', // название меню
		],
		'public'              => false,
		'show_ui'             => true, 
		'menu_icon'           => null,
		'supports'            => ['thumbnail'], // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
	]);
}

//размер загружаеых изображений
function alm_remove_image_size() {
	global $ajax_load_more;
	remove_filter( 'after_setup_theme', array( $ajax_load_more, 'alm_image_sizes' ) );
}
 

//получение отзывов
 function getReviews() {
    $args = array(
		'numberposts' => '30',
        'orderby' => 'date',
        'order' => 'ASC', 
        'post_type' => 'reviews',
    );

	$reviews = [];

    foreach(get_posts($args) as $post) {
		$review = get_fields($post->ID);
		$review['name'] = $post->post_title;
		$review['img'] = get_the_post_thumbnail_url( $post->ID, 'thumbnail' );
		$reviews[] = $review;
    }
    
    return $reviews;
}


//получение готовых работ
function getExamples() {
    $args = array(
		'numberposts' => '30',
        'orderby' => 'date',
        'order' => 'ASC', 
        'post_type' => 'example',
    );

	$examples = [];

    foreach(get_posts($args) as $post) {
		$example = get_fields($post->ID);
		$example['name'] = $post->post_title;
		$example['img'] = get_the_post_thumbnail_url( $post->ID, 'thumbnail' );
		$examples[] = $example;
    }
    
    return $examples;
}


function getMain() {
    $args = array(
		'numberposts' => '30',
        'orderby' => 'date',
        'order' => 'ASC', 
        'post_type' => 'static',
    );

	$main = [];

    foreach(get_posts($args) as $post) {
		$main = get_fields($post->ID);
		$main['img'] = get_the_post_thumbnail_url( $post->ID, 'thumbnail' );
		$main[] = $example;
    }
    
    return $main;
}






