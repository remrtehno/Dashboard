docker build . -t cr.yandex/crp8p4ebt3tssa14nrgh/honeyleads-frontend:dev
docker login --username oauth --password AgAAAAA5wI92AATuwZSgX0LEnE7Qts5mj-U3caM cr.yandex
docker push cr.yandex/crp8p4ebt3tssa14nrgh/honeyleads-frontend:dev
ssh hladmin@84.201.132.98 sudo docker login --username oauth --password AgAAAAA5wI92AATuwZSgX0LEnE7Qts5mj-U3caM cr.yandex; sudo docker-compose pull; sudo docker-compose up -d; sudo docker restart nginx; sudo docker image prune -f
