<?php

require "./inc/conexion/conexion.php"; 

class Cities extends DB{

    public function get_cities($city,$limit){
        $con = $this->connect();
        $city = "%{$city}%";

        $query = $con->prepare("SELECT * FROM cities WHERE city LIKE ? LIMIT ?");
        $query->bind_param("si", $city,$limit);
        $query->execute();
        $result = $query->get_result();

        $query = $con->query("SELECT * FROM cities");
        $data_count = $query->num_rows;
   
        return [
            "result"=> $result,
            "count"=> $data_count
        ];   
        
    }
    
}
