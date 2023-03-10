// import jenkins-auto-approve-script.groovy

job('pruebaDSL') {
    description('Descripcion')



    scm {
        git('https://github.com/danifpgm/jenkins-prueba.git', 'master'){ 
            node -> 
                node / gitConfigName('danifpgm')
                node / gitConfigEmail('danifpgm@gmail.com')
        }
    }
    triggers {
        githubPush()
    }
    
    steps {
<<<<<<< HEAD
        shell("bash levantar-api.sh")
=======
        shell("bash ./build/scripts/levantar-api.sh")
>>>>>>> fa39b610b5f3f281133d9ace382d8c9f8d046c56
    }
}