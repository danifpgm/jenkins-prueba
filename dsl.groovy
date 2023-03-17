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
        // shell("bash levantar-api.sh")
        sh 'chmod +x ./levantar-api.sh'
        sh './levantar-api.sh'
    }
}