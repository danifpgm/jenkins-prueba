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
        shell("bash ./build/scripts/levantar-api.sh")
    }
}