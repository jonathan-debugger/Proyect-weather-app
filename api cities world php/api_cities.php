<?php 
header('Access-Control-Allow-Origin: *');
header("Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure");

include_once "./cities_world.php";

class Api_Cities{ 

    private $name;
    private $limit;

    public function __construct($city,$limit){
        $this-> name = htmlspecialchars($city);
        $this-> limit = htmlspecialchars($limit);
    }

    public function list(){
        $cts = new Cities();
        $data = $cts-> get_cities($this->name, $this->limit);
        $cities =  array();
            
        while ($row = $data["result"]->fetch_assoc()) {
            $cities[] = array(
                        "name" => $row["city"],
                        "country" => $row["country"],
                        "lat" => $row["lat"],
                        "lng" => $row["lng"]
                     ); 
        }

        $data = array(
                    "draw" => 1,
                    "recordsTotal" => $data["count"],
                    "recordsFiltered" => count($cities),
                    "data" => $cities
                );
                
        //Imprimimos el json y codificamos los catacteres especiales
        echo json_encode($data, JSON_UNESCAPED_UNICODE);  
    }


}



$api = new Api_Cities($_GET["city"],$_GET["limit"]);
$api-> list();
