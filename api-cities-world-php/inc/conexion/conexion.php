<?php 

class DB{
    
    private $host;
    private $user;
    private $pass;
    private $db;

   public function __construct(){
        $this-> host = "localhost";
        $this-> user = "root";
        $this-> pass = "";
        $this-> db = "cities_world";
    }
    
   public function connect(){
        try {
            $con = new mysqli(
                $this-> host,
                $this-> user,
                $this-> pass,
                $this-> db,
            );

            return $con;

        } catch (Exception $e) {
            echo "Erro connection: ". $e->getMessage();
            
        }

    
   }

}

// $con  = new DB();
// $con = $con->connect(); 
// $hola = 'bogota';

// $query = $con->prepare("SELECT * FROM cities where city = ?");
// $query->bind_param("s", $hola);
// $query->execute();
// $result = $query->get_result();
// while ($row = $result->fetch_assoc()) {
//     echo $row['city'].'<br>';
//     if ($row['id_table']==20) {
//         break;
//     } 
// return $result;
// }


// $query = $con->query("select * from cities");

// while ($row = $query->fetch_assoc()) {
//     echo $row['city'].'<br>';
//     if ($row['id_table']==20) {
//         break;
//     }
// }


